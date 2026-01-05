FROM python:3.11-slim

WORKDIR /app

# Vì context trong compose là ./backend, lệnh này copy 
# nội dung bên trong thư mục backend máy thật vào /app trong container
COPY . .

# Cài đặt thư viện (đảm bảo file requirements.txt nằm ngay trong thư mục backend)
RUN pip install --no-cache-dir -r requirements.txt

# Thiết lập môi trường để Flask tìm thấy file chạy
ENV FLASK_APP=main.py
ENV PYTHONPATH=/app

# Chạy trực tiếp bằng python để dễ debug lỗi import
CMD ["python", "main.py"]