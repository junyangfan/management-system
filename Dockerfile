FROM nginx:1.19.6

ADD dist/ /etc/nginx/html

EXPOSE 7266

ARG env

RUN rm -rf /etc/nginx/nginx.conf

COPY nginx-${env}.conf /etc/nginx/nginx.conf


