import { Duplex } from 'stream'
let count = 0
const server = new Duplex({
  objectMode: true, // gasta mais memória, mas não precisa converter os buffers para string pois ele já faz isso.
  read() {
    const everySecond = intervalContext => {
      if (count++ <= 5) {
        this.push(`Olá! ${count}\n`)

        return
      }

      clearInterval(intervalContext)
      this.push(null)
    }

    setInterval(() => everySecond(this), 1000)
  },
  write(chunk, encoding, cb) {
    console.log(`[writable] saving`, chunk)

    cb()
  },
})

// write aciona o writable do Duplex
server.write('[duplex] hey this is a writable!\n')

// on 'data' loga o que aconteceu no .push do readable
server.on('data', msg => console.log('[readable] received', msg))

server.push(`[duplex] hey this is also a readable!\n`)

// server.pipe(process.stdout)


// o Transform é também um Duplex, porém, eles não possuem comunicação independente igual o Duplex.
// se eu der um transform.write() ele vai passar pelo transform e se der um transform.push() ele vai passar somente pela readable do Transform.