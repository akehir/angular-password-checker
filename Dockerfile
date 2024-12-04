FROM nginx:mainline-alpine-slim

WORKDIR /app

COPY ./dist/example-app/browser/ .

COPY ./nginx.conf /etc/nginx/nginx.conf
