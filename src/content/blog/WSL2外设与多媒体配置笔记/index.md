---
title: WSL2 外设与多媒体配置笔记
publishDate: 2026-06-16
description: 'WSL2 中 USB 设备转发、摄像头视频流测试与 WSLg 音频重定向的配置和原理整理。'
tags:
  - technology
  - WSL2
  - Windows
  - Linux
language: 'Chinese'
---

这篇文章由 WSL2 相关笔记合并整理而来，主要覆盖 USB 设备转发、摄像头视频流测试，以及 WSLg 下的音频重定向配置。

---

## usb通信

### Windows 安装 usbipd

```shell
winget install usbipd
```

#### 连接 USB 设备

在附加 USB 设备之前，请确保 WSL 命令行处于打开状态。 这会使 WSL 2 轻型 VM 保持运行。

 备注

此文档假定已安装 [`usbipd-win 4.0.0` 或更高版本](https://github.com/dorssel/usbipd-win/releases/latest)

1. 通过以 _管理员_ 模式打开 PowerShell 并输入以下命令列出连接到 Windows 的所有 USB 设备。 列出设备后，选择并复制要附加到 WSL 的设备总线 ID。

```
usbipd list
```

2. 在附加 USB 设备之前，必须使用该命令 `usbipd bind` 来共享设备，从而允许它附加到 WSL。 这需要管理员权限。 选择要在 WSL 中使用的设备的总线 ID，然后运行以下命令。 运行命令后，请再次使用命令 `usbipd list` 验证设备是否共享。

```
usbipd bind --busid 4-4
```

3. 若要附加 USB 设备，请运行以下命令。 （不再需要使用提升的管理员提示。确保 WSL 命令提示符处于打开状态，以使 WSL 2 轻型 VM 保持活动状态。 请注意，只要 USB 设备连接到 WSL，Windows 将无法使用它。 一旦连接到 WSL，任何在 WSL 2 上运行的发行版都可以使用该 USB 设备。 请确认设备是否已连接 `usbipd list`。 在 WSL 提示符下，运行 `lsusb` 以验证 USB 设备是否已列出，并且可以使用 Linux 工具与之交互。

```
usbipd attach --wsl --busid <busid>
```

4. 打开 Ubuntu（或首选 WSL 命令行），并使用以下命令列出附加的 USB 设备：
```
lsusb
```

应会看到刚刚附加的设备，并且能够使用普通 Linux 工具与之交互。 根据应用程序，可能需要配置 udev 规则，以允许非根用户访问设备。

5. 在 WSL 中使用设备后，可以物理断开 USB 设备的连接，或者从 PowerShell 运行以下命令：

```
usbipd detach --busid <busid>
```


### 原理

#### 总体架构概述

`usbipd`（USB/IP Device Manager）的实现基于 **客户端-服务器架构** 和 **网络化的设备共享** 理念。其核心原理可以概括为：

**将 Windows 主机上的物理 USB 设备通过网络协议"导出"，然后由 WSL 2 内的 Linux 内核通过 USB/IP 客户端协议"导入"并识别为本地设备。**

---

#### 技术原理分层解析

##### 1. USB/IP 协议基础

USB/IP 是一个开源项目，其核心思想是将 USB 协议封装在 TCP/IP 协议中传输：

```
物理USB设备 → USB协议数据 → TCP/IP封装 → 网络传输 → TCP/IP解封装 → 虚拟USB设备
```

##### 2. Windows 端（服务器端）工作原理

###### a. 设备识别与绑定
```bash
# 在Windows PowerShell中
usbipd list
# 输出显示所有可用USB设备及其BUSID
```

**原理**：`usbipd` 通过 Windows Driver Kit (WDK) 接口枚举系统上的 USB 设备，获取每个设备的详细信息。

###### b. 设备共享（绑定）
```bash
usbipd bind --busid <BUSID>
```

**底层操作**：
1. **创建虚拟 USB 控制器**：为指定设备创建虚拟的 USB 主机控制器
2. **协议封装**：将 USB 请求块 (URB) 序列化为 USB/IP 协议格式
3. **网络服务启动**：在指定端口 (3240) 监听连接请求

###### c. 网络传输层
- **协议**：TCP/IP
- **端口**：默认 3240
- **数据格式**：自定义的 USB/IP 协议头 + USB 数据载荷

##### 3. WSL 2 端（客户端）工作原理

###### a. USB/IP 客户端驱动
WSL 2 内核已经编译了 `usbip-host` 驱动模块：

```bash
# 在WSL2中检查驱动
lsmod | grep usbip
modprobe usbip-host    # 加载驱动
```

###### b. 设备附加流程
```bash
# 连接到Windows主机并附加设备
usbip attach -r <Windows-IP> -b <BUSID>
```

**详细过程**：
1. **TCP 连接建立**：连接到 Windows 主机的 3240 端口
2. **设备枚举**：获取可用的共享设备列表
3. **驱动绑定**：将远程设备绑定到本地虚拟 USB 端口
4. **设备节点创建**：在 `/dev/` 下创建相应的设备文件

##### 4. 数据传输流程

###### 请求路径（WSL 2 → Windows）
```
应用程序 → Linux USB子系统 → usbip-host驱动 → TCP socket → 网络 → 
Windows TCP栈 → usbipd服务 → 解析USB/IP协议 → 原生USB API调用 → 物理设备
```

###### 响应路径（Windows → WSL 2）
```
物理设备响应 → 原生USB API → usbipd服务 → USB/IP协议封装 → 网络传输 → 
WSL2 TCP栈 → usbip-host驱动 → 协议解析 → Linux USB子系统 → 应用程序
```

##### 5. 内核层面的交互

###### Windows 内核层面：
- **usbipd. Sys**：内核模式驱动程序，处理实际的 USB 通信
- **用户模式服务**：管理连接和设备状态
- **与原生 USB 栈交互**：通过标准的 Windows USB 驱动程序接口

###### Linux 内核层面（WSL 2）：
- **usbip-core. Ko**：核心协议处理模块
- **usbip-host. Ko**：客户端功能实现
- **虚拟 USB 主机控制器**：模拟本地 USB 硬件

##### 6. 网络通信细节

###### 协议数据包结构：
```c
struct usbip_header {
    uint32_t command;        // 命令类型
    uint32_t seqnum;         // 序列号
    uint32_t devid;          // 设备ID
    uint32_t direction;      // 数据传输方向
    uint32_t ep;             // 端点号
    // ... 其他字段
    uint32_t transfer_buffer_length; // 数据长度
    // 实际USB数据跟随在后
};
```

###### 主要命令类型：
- `USBIP_CMD_SUBMIT`：提交 USB 请求
- `USBIP_CMD_UNLINK`：取消请求
- `USBIP_RET_SUBMIT`：请求完成响应

##### 7. 性能考量与优化

###### 延迟处理：
- **批量传输缓冲**：对批量传输进行缓冲以减少小包开销
- **等时传输优化**：对音频、视频等实时设备特殊处理
- **零拷贝技术**：在可能的情况下避免数据复制

###### 带宽管理：
- **TCP 拥塞控制**：依赖 TCP 的流量控制机制
- **服务质量 (QoS)**：优先处理实时设备数据

##### 8. 安全性机制

###### 连接认证：
```bash
# 基于IP地址的访问控制
usbipd bind --busid <BUSID> --allowed-principals <IP-address>
```

###### 数据传输安全：
- **本地回环网络**：默认使用 127.0.0.1，不暴露到外部网络
- **无加密**：USB/IP 协议本身不加密，但在本地环境下可接受

##### 9. 设备类型支持差异

###### 良好支持的设备：
- USB 存储设备（U 盘、移动硬盘）
- USB 串口设备
- USB 网络适配器
- HID 设备（键盘、鼠标）

###### 有限支持的设备：
- **等时传输设备**：摄像头、音频设备（有延迟问题）
- **高速设备**：USB 3.0+设备可能受网络带宽限制
- **特殊功能设备**：需要特定驱动程序的设备

##### 10. 与 WSLg 的协同工作

当同时使用 USBIP 和 WSLg 时：

```
物理USB设备 → usbipd (Windows) → USB/IP协议 → WSL2 usbip-client → 
Linux设备节点 → 应用程序 → WSLg音频重定向 → Windows音频输出
```

这种架构允许某些设备通过 USB/IP 直接访问，而其他设备（如音频）通过 WSLg 重定向。

---

## 视频流

### 1. Share 端口

用 [连接 USB 设备](#连接-usb-设备) 这里的方法，将摄像头先 share，再 attach 到 wsl 中

### 2. 设置环境变量

由于 X11 共享内存（MIT-SHM）扩展权限问题导致的。wsl和windows宿主机共享了x11内存，导致wsl无法直接使用摄像头 
```bash  
export XLIB_SKIP_ARGB_VISUALS=1
export LIBGL_ALWAYS_INDIRECT=0
# guvcview # 测试摄像头的录制软件
```

### 3. 测试代码

```python 
import cv2
import time

def display_camera_feed():
    """
    优化的摄像头实时显示，解决卡顿问题
    按 'q' 键退出程序
    """
    # 打开默认摄像头
    cap = cv2.VideoCapture(0, cv2.CAP_V4L2)
    
    # 检查摄像头是否成功打开
    if not cap.isOpened():
        print("错误：无法打开摄像头")
        return
    
    # 关键优化：设置缓冲区大小为1，避免帧积压
    cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)
    
    # 设置视频格式和参数
    cap.set(cv2.CAP_PROP_FOURCC, cv2.VideoWriter_fourcc('M', 'J', 'P', 'G'))
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
    cap.set(cv2.CAP_PROP_FPS, 30)
    
    print("摄像头初始化中...")
    time.sleep(1)
    print("摄像头已打开，按 'q' 键退出")
    
    while True:
        # 读取帧
        ret, frame = cap.read()
        
        if not ret or frame is None:
            print("警告：无法读取帧，跳过此帧")
            continue
        
        # 关键优化：清空缓冲区，确保获取最新帧
        cap.grab()
        
        # 显示图像
        cv2.imshow('Camera Feed', frame)
        
        # 关键优化：使用更短的等待时间
        if cv2.waitKey(1) & 0xFF  ord('q'):
            break
    
    # 清理资源
    cap.release()
    cv2.destroyAllWindows()

def display_camera_feed_alternative():
    """
    备选方案：使用线程读取帧，进一步优化性能
    """
    import threading
    from queue import Queue
    
    # 帧队列
    frame_queue = Queue(maxsize=2)
    stop_event = threading.Event()
    
    def capture_frames():
        cap = cv2.VideoCapture(0, cv2.CAP_V4L2)
        cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)
        cap.set(cv2.CAP_PROP_FOURCC, cv2.VideoWriter_fourcc('M', 'J', 'P', 'G'))
        cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
        cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
        cap.set(cv2.CAP_PROP_FPS, 30)
        
        while not stop_event.is_set():
            ret, frame = cap.read()
            if ret and frame is not None:
                # 如果队列满了，丢弃旧帧
                if frame_queue.full():
                    try:
                        frame_queue.get_nowait()
                    except:
                        pass
                frame_queue.put(frame)
        
        cap.release()
    
    # 启动捕获线程
    capture_thread = threading.Thread(target=capture_frames)
    capture_thread.start()
    
    print("摄像头已启动（线程版本），按 'q' 键退出")
    
    try:
        while True:
            if not frame_queue.empty():
                frame = frame_queue.get()
                cv2.imshow('Camera Feed (Threaded)', frame)
            
            if cv2.waitKey(1) & 0xFF  ord('q'):
                break
    finally:
        stop_event.set()
        capture_thread.join()
        cv2.destroyAllWindows()

if __name__  "__main__":
    display_camera_feed()
	# display_camera_feed_alternative() # 备选方案 
``` 

即可看到视频画面了

<video controls preload="metadata" style="width: 100%; border-radius: 0.75rem;" src="/blog-assets/wsl2-peripherals-media/wsl2-01.mp4"></video>

---

## 音频重定向

**使用WSLg的音频重定向**  
较新版本的WSL2引入了WSLg，它提供了音频重定向功能，无需额外配置即可使用Windows的音频设备：

1. 确保WSL2版本足够新：

```bash
 wsl --version
```

如果版本低于1.0.0，请更新WSL2：

```bash
# 在Windows PowerShell中运行   
wsl --update
```

2. 安装必要的音频工具：

```bash
sudo apt-get update

sudo apt-get install -y pulseaudio alsa-utils
```

3. 配置PulseAudio使用WSLg的音频服务：

```bash
# 创建或编辑PulseAudio配置文件
mkdir -p ~/.config/pulse
echo "default-server = unix:/mnt/wslg/PulseServer" > ~/.config/pulse/client.conf
```

4. 测试音频重定向：

```bash
# 安装一个简单的音频测试工具
sudo apt-get install -y sox 
# 测试录音
rec test.wav
```

之后应该就可以正常的在WSL2当中使用麦克风设备了

5. 然后播放

```shell
play test.wav
```
