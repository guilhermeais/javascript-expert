docker run \
  --name postgres-strategy \
  -e POSTGRES_USER=guilherme \
  -e POSTGRES_PASSWORD=123456 \
  -e POSTGRES_DB=heroes \
  -p 5435:5432 \
  -d \
  postgres

docker logs postgres-strategy
docker exec -it postgres-strategy psql -U guilherme --dbname heroes
CREATE TABLE warriors(id serial PRIMARY KEY, name VARCHAR (255) not null);
SELECT * FROM warriors;

# mongodb
docker run \
  --name mongodb-strategy \
  -e MONGO_INITDB_ROOT_USERNAME=guilherme \
  -e MONGO_INITDB_ROOT_PASSWORD=123456 \
  -p 27018:27017 \
  -d \
  mongo:4

docker logs mongodb-strategy