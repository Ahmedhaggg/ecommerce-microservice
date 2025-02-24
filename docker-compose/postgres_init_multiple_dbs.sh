#!/bin/bash
set -e

# Databases to create
DATABASES=("auth")

# Create each database
for DB in "${DATABASES[@]}"; do
    echo "Creating database: $DB"
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
        CREATE DATABASE $DB;
    EOSQL
done
