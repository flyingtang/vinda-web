FROM nginx:stable-alpine

RUN echo "http://mirrors.aliyun.com/alpine/v3.6/main/" > /etc/apk/repositories
RUN apk update && apk add tzdata \
    && rm -f /etc/localtime \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

WORKDIR /usr/share/nginx/html
RUN mkdir -p /usr/share/nginx/html/admin &&  mkdir -p /usr/share/nginx/html/static
 
COPY ./dist /usr/share/nginx/html/
COPY ./dist/static /usr/share/nginx/html/static/
COPY ./nginx.conf /etc/nginx/conf.d/

EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]