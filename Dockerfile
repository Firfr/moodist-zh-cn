# 编译阶段
FROM node:20.19.1-alpine3.21 AS build

RUN npm config set registry https://registry.npmmirror.com

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

# 最终镜像
FROM lipanski/docker-static-website:2.6.0

# 静态文件路径 /home/static
COPY --from=build /app/dist /home/static/

ENTRYPOINT ["/busybox-httpd", "-f", "-v"]
CMD [ "-p", "3000" ]

# 暴露端口
EXPOSE 3000

# docker build -t firfe/moodist:2.1.0 .

