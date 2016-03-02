FROM nginx:1.9
ADD nginx.conf.tpl /etc/nginx/nginx.conf.tpl
ADD proxy.conf /etc/nginx/proxy.conf
ADD start.sh /start.sh
RUN chmod +x /start.sh
ADD static/ /var/www/

CMD [ "/start.sh" ]
