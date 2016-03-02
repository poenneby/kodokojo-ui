#!/bin/bash

sed -e "s/@@BACK_HOST@@/${BACK_HOST}/g" -e "s/@@BACK_PORT@@/${BACK_PORT}/g" /etc/nginx/nginx.conf.tpl > /etc/nginx/nginx.conf

nginx -g 'daemon off;'