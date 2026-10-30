# 提前 编译好，这里只打包，不编译

# 最终镜像
FROM docker.code.firfe.work/lipanski/docker-static-website:2.6.0

# 静态文件路径 /home/static
COPY --chmod=555 /代码/dist /home/static/

ENTRYPOINT ["/busybox-httpd", "-f", "-v"]
CMD [ "-p", "8080" ]

# 暴露端口
EXPOSE 8080

LABEL 原项目地址="https://github.com/remvze/moodist"
LABEL 镜像制作者="https://space.bilibili.com/17547201"
LABEL GitHub主页="https://github.com/Firfr/moodist-zh-cn"
LABEL Gitee主页="https://gitee.com/firfe/moodist-zh-cn"
