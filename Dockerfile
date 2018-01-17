FROM nginx:latest

MAINTAINER Crowdcode.io „christoph.schemmelmann@crowdcode.io"

RUN mkdir -p /var/www/Bingo


COPY default.conf /etc/nginx/conf.d/default.conf
COPY index.html /var/www/Bingo/index.html
COPY styles.css /var/www/Bingo/styles.css
COPY bingo.css /var/www/Bingo/bingo.css
COPY bingo.js /var/www/Bingo/bingo.js
COPY images/ /var/www/Bingo/images

VOLUME ["/var/cache/nginx", "/var/log/nginx"]

EXPOSE 80

CMD nginx -g "daemon off;"
