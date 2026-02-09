FROM nginx:latest

LABEL otc_front=1.0
ADD dist /usr/share/nginx/html
ADD default.conf /etc/nginx/conf.d

RUN chmod -R 755 /usr/share/nginx/html
