import { pipeline } from 'stream/promises'

import axios from 'axios'
import { Readable, Writable } from 'stream'

const API_ONE = 'http://localhost:3000'
const API_TWO = 'http://localhost:3001'

const requests = await Promise.all([
  axios.get(API_ONE, { responseType: 'stream' }),
  axios.get(API_TWO, { responseType: 'stream' }),
])

const results = requests.map(({ data }) => data)


//writable stream
async function * output(stream) {
  for await (const data of stream) {
    const findNameRegex = /:"(?<name>.*)(?=-)/
    const name = data.match(findNameRegex).groups.name
    console.log(`[${name.toLowerCase()}]: ${data}`)
  }
} 

// passthrough é um stream que não faz nada, ele apenas repassa os dados de varios streams para um unico stream
async function* merge(streams) {
  for (const readable of streams) {
    readable.setEncoding('utf-8')
    for await (const chunk of readable) {
      for (const line of chunk.trim().split(/\n/)) {
        yield line
      }
    }
  }
}

await pipeline(merge(results), output)
