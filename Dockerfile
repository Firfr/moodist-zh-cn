FROM node:20.19.0-alpine3.21 AS build
WORKDIR /app
COPY . .
RUN npm config set registry https://registry.npmmirror.com && \
    npm install && \
    npm run build

FROM nginx:1.26.3-alpine-slim AS runtime
WORKDIR /app
COPY ./docker/nginx/ssl /ssl
COPY ./docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /app

EXPOSE 9260 9460

# docker build -t firfe/moodist:25.4.6 .