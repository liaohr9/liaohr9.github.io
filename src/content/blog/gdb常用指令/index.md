---
title: GDB常用指令
publishDate: 2024-11-30
description: 'GDB（GNU Debugger）调试命令大全，涵盖断点设置、单步执行、变量查看等常用操作。'
tags:
  - technology
language: 'Chinese'
---

GDB（GNU Debugger）提供了丰富的调试命令，涵盖代码运行、断点管理、变量查看、堆栈分析等多个方面。以下是 GDB 的所有主要调试命令，按类别分类：

---

## 1. **启动和退出**

| 命令                             | 说明                |
| ------------------------------ | ----------------- |
| `gdb program`                  | 调试可执行文件 `program` |
| `gdb --args program arg1 arg2` | 传递参数给 `program`   |
| `gdb -p PID`                   | 附加到进程 PID         |
| `q` / `quit`                   | 退出 GDB            |

---

## 2. **运行程序**

|命令|说明|
|---|---|
|`r` / `run [args]`|运行程序，可传递参数|
|`start`|启动程序并停在 `main()` 之前|
|`kill`|终止正在调试的程序|

---

## 3. **断点（Breakpoints）**

|命令|说明|
|---|---|
|`b` / `break func_name`|在函数 `func_name` 处设置断点|
|`b line_number`|在当前源文件的 `line_number` 处设置断点|
|`b file:line`|在指定文件 `file` 的 `line` 行处设置断点|
|`b *address`|在内存地址 `address` 处设置断点|
|`info breakpoints`|显示所有断点|
|`delete [num]`|删除编号为 `num` 的断点（默认删除所有断点）|
|`clear func_name`|清除函数 `func_name` 的断点|
|`clear file:line`|清除 `file` 文件 `line` 行的断点|
|`enable [num]`|启用编号为 `num` 的断点|
|`disable [num]`|禁用编号为 `num` 的断点|
|`condition num expr`|仅当 `expr` 为真时，触发编号为 `num` 的断点|

---

## 4. **观察点（Watchpoints）**

|命令|说明|
|---|---|
|`watch var`|监视变量 `var` 变化时暂停|
|`rwatch var`|变量 `var` 被读取时暂停|
|`awatch var`|变量 `var` 被读/写时暂停|
|`info watchpoints`|显示所有监视点|
|`delete watch num`|删除编号为 `num` 的监视点|

---

## 5. **单步执行（Stepping）**

|命令|说明|
|---|---|
|`s` / `step`|单步执行代码（进入函数内部）|
|`n` / `next`|单步执行代码（不进入函数内部）|
|`finish`|运行到当前函数返回|
|`until`|运行到当前代码块结束|

---

## 6. **继续执行**

|命令|说明|
|---|---|
|`c` / `continue`|继续执行到下一个断点|
|`jump line`|跳转到 `line` 行执行|

---

## 7. **堆栈（Stack）**

|命令|说明|
|---|---|
|`bt` / `backtrace`|显示当前调用栈|
|`bt full`|显示完整的调用栈（包含参数和变量）|
|`frame num`|切换到编号 `num` 的栈帧|
|`up`|向上移动一层栈帧|
|`down`|向下移动一层栈帧|

---

## 8. **打印变量**

|命令|说明|
|---|---|
|`p` / `print expr`|打印表达式 `expr` 的值|
|`ptype var`|显示变量 `var` 的类型|
|`whatis var`|显示变量 `var` 的类型|
|`x addr`|以十六进制格式查看 `addr` 处的内存|
|`x/4x addr`|以十六进制显示 `addr` 处的 4 个单位数据|

---

## 9. **寄存器**

|命令|说明|
|---|---|
|`info registers`|显示所有寄存器的值|
|`p $eax`|打印寄存器 `eax` 的值|

---

## 10. **信号（Signals）**

|命令|说明|
|---|---|
|`handle SIGSEGV stop`|在 `SIGSEGV` 信号触发时暂停|
|`handle SIGINT nostop`|忽略 `SIGINT` 信号|

---

## 11. **调试共享库**

|命令|说明|
|---|---|
|`info sharedlibrary`|显示加载的共享库|
|`set solib-search-path path`|设置共享库搜索路径|

---

## 12. **修改变量**

|命令|说明|
|---|---|
|`set var = value`|修改变量值|
|`set $eax = 0x1234`|修改寄存器值|

---

## 13. **附加进程**

|命令|说明|
|---|---|
|`attach PID`|附加到进程 `PID`|
|`detach`|断开调试进程|

---

## 14. **线程调试**

|命令|说明|
|---|---|
|`info threads`|显示所有线程|
|`thread num`|切换到 `num` 号线程|
|`thread apply all cmd`|对所有线程执行 `cmd`|

---

## 15. **脚本**

|命令|说明|
|---|---|
|`source file`|运行 `file` 中的 GDB 命令|
|`define cmd`|自定义命令|
|`document cmd`|添加自定义命令的文档|
|`save breakpoints file`|将断点信息保存到 `file`|

---

## 16. **GDB 调试 TUI 模式**

|命令|说明|
|---|---|
|`layout src`|显示源码窗口|
|`layout asm`|显示汇编窗口|
|`layout regs`|显示寄存器窗口|
|`tui enable`|启用 TUI 模式|
|`tui disable`|禁用 TUI 模式|
