FROM mariadb:11.4

ENV MARIADB_DATABASE=appdb \
    MARIADB_USER=appuser \
    MARIADB_PASSWORD=apppassword \
    MARIADB_ROOT_PASSWORD=rootpassword

COPY ./init.sql /docker-entrypoint-initdb.d

EXPOSE 3306