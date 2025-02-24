FROM postgres:14-alpine3.20
COPY postgres_init_multiple_dbs.sh /docker-entrypoint-initdb.d/postgres_init_multiple_dbs.sh
RUN chmod +x /docker-entrypoint-initdb.d/postgres_init_multiple_dbs.sh
