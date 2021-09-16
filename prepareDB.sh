psql -c "CREATE USER tgbot WITH PASSWORD 'Sj9pYgMeekCcJOEmsbqjWZQPH';"
psql -c "create database tgparser OWNER tgbot;"
psql -c "grant all privileges on database tgparser to tgbot;"

