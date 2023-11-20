FROM nginx:mainline-alpine-slim

WORKDIR /tfc

COPY ./dist/travel-for-change/ .

COPY ./nginx.conf /etc/nginx/nginx.conf
