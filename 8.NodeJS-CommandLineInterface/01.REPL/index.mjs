import http from 'http'

function netSalary({
  discount,
  salary
}) {
  const percent = discount / 100;
  const cost = salary * percent;
  return salary - cost;
}

http.createServer((req, res) => {
  const url = req.url.replace('/', '');
  const params = Object.fromEntries(new URLSearchParams(url));
  const result = netSalary(params)
  res.end(`O seu salário final é: R$ ${result}`);
})
.listen(3000, console.log('app running'))