#!/bin/bash

# Đường dẫn tương đối tới tệp cần sửa đổi
file_path="./ios/Pods/FlipperKit/iOS/FlipperKit/FlipperPlatformWebSocket.mm"
# Nếu đường dẫn trên không đúng, bạn có thể sử dụng đường dẫn thay thế
# file_path="./Pods/FlipperKit/iOS/FlipperKit/FlipperPlatformWebSocket.mm"

# Kiểm tra xem tệp có tồn tại không
if [[ ! -f "$file_path" ]]; then
  echo "Không tìm thấy tệp: $file_path"
  exit 1
fi

# Sao lưu tệp trước khi sửa đổi (Tuỳ chọn)
cp "$file_path" "${file_path}.backup" || { echo "Không thể sao lưu tệp. Kiểm tra quyền truy cập."; exit 1; }

# Dòng cần chèn
added_line="#import <functional>"

# Thực hiện chèn dòng sau dòng '#ifdef FB_SONARKIT_ENABLED'
# Phương pháp này tương thích với macOS và Linux
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS
  sed_output=$(sed -i '' "/^#ifdef FB_SONARKIT_ENABLED$/a\\
$added_line" "$file_path" 2>&1)
else
  # Linux
  sed_output=$(sed -i "/^#ifdef FB_SONARKIT_ENABLED$/a $added_line" "$file_path" 2>&1)
fi

# Kiểm tra kết quả của lệnh sed
if [[ $? -ne 0 ]]; then
  echo "Lỗi trong quá trình thực hiện sed: $sed_output"
  exit 1
else
    echo  "Đã thêm $added_line vào trong $file_path. Fix lỗi ios "
fi



