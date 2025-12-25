# 编译
FROM docker.code.firfe.work/node:20.19.5-alpine3.22 AS build
WORKDIR /app
COPY 代码 .
RUN npm install
RUN npm run build
RUN chmod -R 777 /app/dist

# 最终镜像
FROM docker.code.firfe.work/lipanski/docker-static-website:2.6.0

# 静态文件路径 /home/static
COPY --from=build /app/dist /home/static/

ENTRYPOINT ["/busybox-httpd", "-f", "-v"]
CMD [ "-p", "8080" ]

# 暴露端口
EXPOSE 8080

LABEL 原项目地址="https://github.com/remvze/moodist"
LABEL 镜像制作者="https://space.bilibili.com/17547201"
LABEL GitHub主页="https://github.com/Firfr/moodist-zh-cn"
LABEL Gitee主页="https://gitee.com/firfe/moodist-zh-cn"

# docker buildx build --platform linux/amd64 --tag firfe/moodist:2.4.0 --load .
# docker buildx build --platform linux/arm64 --tag firfe/moodist:2.4.0-arm64 --load .
