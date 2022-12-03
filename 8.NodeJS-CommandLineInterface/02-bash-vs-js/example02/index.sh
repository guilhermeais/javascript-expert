CONTAINER_ID=$(docker run -p "8080:80" -d nginx)
echo "Container ID: $CONTAINER_ID"
# wait for the container to start
CONTAINER_IS_RUNNING=$(docker inspect -f {{.State.Running}} $CONTAINER_ID)
echo "Waiting for the container to start..."
while [ ! CONTAINER_IS_RUNNING  ]  ; do
  CONTAINER_IS_RUNNING=$(docker inspect -f {{.State.Running}} $CONTAINER_ID)
  sleep .1
done 
echo "Container started"

echo "\ncurl on http://localhost:8080"
curl --silent localhost:8080

echo "\nLogs:"
docker logs $CONTAINER_ID

echo "\nStopping the container..."
docker rm -f $CONTAINER_ID
echo "Container stopped"