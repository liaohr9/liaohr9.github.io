import os
from PIL import Image

def compress_images(folder_path):
    # 遍历目标文件夹中的所有文件
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)
        
        # 检查是否是图片文件
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif')):
            try:
                # 打开图片
                with Image.open(file_path) as img:
                    # 设置保存路径为 JPG 格式
                    compressed_path = os.path.splitext(file_path)[0] + ".jpg"
                    
                    # 压缩图片质量为 20%
                    img.convert("RGB").save(compressed_path, "JPEG", quality=20)
                
                # 如果原文件不是 JPG 格式，删除原文件
                if not filename.lower().endswith('.jpg'):
                    os.remove(file_path)
                    print(f"Compressed and removed: {filename}")
                else:
                    print(f"Compressed and overwritten: {filename}")
            except Exception as e:
                print(f"Error processing {filename}: {e}")

if __name__ == "__main__":
    target_folder = r"E:\homepage\source\_posts\technology\误删文件后的恢复尝试与教训\误删文件后的恢复尝试与教训"
    compress_images(target_folder)