$.verbose = false
await $`CONTAINER_ID=$(docker run -d -p 8080:80 nginx)`;