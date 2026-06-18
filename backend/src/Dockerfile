FROM mariadb:11.4

WORKDIR /docker-entrypoint-initdb.d

COPY ./init.sql /docker-entrypoint-initdb.d

EXPOSE 3306