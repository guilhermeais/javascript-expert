import { PassThrough, Writable } from 'stream'
import axios from 'axios'

const API_ONE = 'http://localhost:3000'
const API_TWO = 'http://localhost:3001'

const requests = await Promise.all([
  axios.get(API_ONE, { responseType: 'stream' }),
  axios.get(API_TWO, { responseType: 'stream' }),
])

const results = requests.map(({ data }) => data)

const output = new Writable({
  write(chunk, encoding, callback) {
    const data = chunk.toString().replace(/\n/, '')
    // dado: {"id":"8bcdeec2-7dde-40c7-8533-e0c2eb1d4b1b","name":"Product-100"}
    //(?=-) - negative lookahead, procura o - e olhar pra trás, no caso ele vai achar o - atrás do 100
    // :"(?<name>.*) - procura o conteúdo :" e guarda o que vier depois em uma variável chamada name
    const findNameRegex = /:"(?<name>.*)(?=-)/
    const name = data.match(findNameRegex).groups.name
    console.log(`[${name.toLowerCase()}]: ${data}`)

    callback()
  }
})

function mergeStreams(...streams) {
  return streams.reduce((previousStream, currentStream, index, items) => {
    currentStream.pipe(previousStream, { end: false })
    // quando o currentStream terminar, ele vai verificar se todas as streams terminaram e se sim, ele vai encerrar o streams anterior
    currentStream.on('end', () => items.every(stream => stream.ended) && previousStream.end())

    return previousStream
  }, new PassThrough())
}

const streams = mergeStreams(...results)

streams.pipe(output)