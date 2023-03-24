URL=localhost:3000
npx autocannon $URL -m POST \
  --warmup [-c 1 -d 3] \
  -c 500 \
  -p 10 \
  --renderStatusCodes