/**
 * Tudo que temos de nativo das streams no NodeJS
 */

// Exemplo 1: 
// STDIN - Standard Input: Entrada padrão, ou seja, o que o usuário digita
// STDOUT - Standard Output: Saída padrão, ou seja, o que o usuário vê
// process.stdin
//   .pipe(process.stdout)
//   .on('data', msg => console.log('data: ', msg.toString()))
//   .on('error', err => console.log('error: ', err))
//   .on('close', () => console.log('close'))
//   .on('end', () => console.log('end'))

// Exemplo 2:
// Terminal 1 - Cliente
// Ele vai basicamente pegar tudo o que o for digitado no terminal e enviar para o servidor que está rodando no terminal 2 (porta 1338)
// process.stdin.pipe(require('net').connect(1338))

// Terminal 2 - Servidor
// Abre um servidor na porta 1338 e vai pegar tudo o que for enviado para ele e vai jogar no STDOUT que é a saída padrão
// require('net').createServer(socket => socket.pipe(process.stdout)).listen(1338)


// Exemplo 3:
// gera arquivo grande
// node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file 
// Forma errada de ler um arquivo grande com NodeJS:
// import http from 'http';
// import { readFileSync } from 'fs'

// http.createServer((req, res) => {
//   // se enviarmos o buffer direto, ok, vai funcionar
//   // mas por exemplo, ao adicionarmos um .toString() e transformarmos o buffer em string, o NodeJS vai tentar ler todo o arquivo de uma vez só e vai dar erro
//   const file = readFileSync('./big.file').toString();
//   res.write(file);
//   res.end();
// }).listen(3000);

// curl http://localhost:3000 -o output.txt

// Forma correta de ler um arquivo grande com NodeJS:
import http from 'http';
import { createReadStream } from 'fs'

http.createServer((req, res) => {
  // Cria uma Readable Stream e a partir do arquivo big-file e envia para o cliente
  createReadStream('./big.file').pipe(res);
}).listen(3000);