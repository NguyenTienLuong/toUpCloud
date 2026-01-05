# Sử dụng base image Node.js chính thức
FROM node:20-alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy các file cấu hình dependency
COPY package*.json ./

# Cài đặt dependency
# Tùy chọn: Dùng npm install hoặc yarn install
RUN npm install

# Copy toàn bộ source code
COPY . .

# Mở cổng mặc định của Vite Dev Server
EXPOSE 5173

# Lệnh khởi động sẽ được override bởi docker-compose.yml
# CMD ["npm", "run", "dev", "--host", "0.0.0.0", "--port", "5173"]