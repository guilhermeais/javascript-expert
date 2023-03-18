echo $'\n\n[requesting: normal request]'
curl -i localhost:3000 -X POST --data '{"name": "Teste", "age": 20}'

echo $'\n\n[requesting: wrong age]'
curl -i localhost:3000 -X POST --data '{"name": "Teste", "age": 17}'

echo $'\n\n[requesting: wrong name]'
curl -i localhost:3000 -X POST --data '{"name": "Tes", "age": 20}'