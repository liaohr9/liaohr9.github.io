import os

def rename_images_in_folder(folder_path):
    # 支持的图片扩展名
    image_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp'}
    
    try:
        for filename in os.listdir(folder_path):
            # 获取文件的扩展名
            _, ext = os.path.splitext(filename)
            if ext.lower() in image_extensions:
                # 检查文件名中是否有空格
                if ' ' in filename:
                    new_filename = filename.replace(' ', '_')
                    old_path = os.path.join(folder_path, filename)
                    new_path = os.path.join(folder_path, new_filename)
                    os.rename(old_path, new_path)
                    print(f'Renamed: {filename} -> {new_filename}')
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    folder_path = input("Enter the folder path: ").strip()
    if os.path.isdir(folder_path):
        rename_images_in_folder(folder_path)
    else:
        print("Invalid folder path.")