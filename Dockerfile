FROM nginx:latest

MAINTAINER Crowdcode.io „christoph.schemmelmann@crowdcode.io"


COPY default.conf /etc/nginx/conf.d/default.conf
COPY index.html /var/www/index.html
COPY styles.css /var/www/styles.css
COPY bingo.css /var/www/bingo.css
COPY bingo.js /var/www/bingo.js
COPY images/ /var/www/images

VOLUME ["/var/cache/nginx", "/var/log/nginx"]

EXPOSE 80

CMD nginx -g "daemon off;"
