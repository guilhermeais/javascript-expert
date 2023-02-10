import { Readable, Writable } from 'stream'

// fonte de dados
const readable = new Readable({
  read() {
    this.push('Hello World!')
    this.push('Hello World!')
    this.push('Hello World!')
    this.push('Hello World!')

    // informa que os dados acabaram
    this.push(null)
  }
})

//saida de dados
const writable = new Writable({
  write(chunk, encoding, callback) {
    console.log(chunk.toString())
    callback()
  }
})

readable.pipe(writable)