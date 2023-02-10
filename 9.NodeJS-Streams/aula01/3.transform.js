import { createWriteStream } from 'fs'
import { Readable, Transform, Duplex } from 'stream'

const getPersons = function* () {
  for (let index = 0; index < 1e5; index++) {
    const person = {
      id: index,
      name: `Person ${index}`,
      age: Math.floor(Math.random() * 100),
    }

    yield JSON.stringify(person)
  }
}
// fonte de dados
const readable = Readable.from(getPersons())

// processamento dos dados
const mapFieldsTransformer = new Transform({
  transform(chunk, encoding, callback) {
    const person = JSON.parse(chunk.toString())
    const { id, name } = person
    callback(null, `${id},${name.toUpperCase()}`)
  },
})

const mapHeaders = new Transform({
  transform(chunk, encoding, callback) {
    this.counter = this.counter || 0

    if (this.counter > 0) {
      return callback(null, chunk)
    }

    this.counter++
    callback(null, 'id,name\n'.concat(chunk.toString()))
  },
})

readable
  .pipe(mapFieldsTransformer)
  .pipe(mapHeaders)
  .pipe(createWriteStream('output.csv'))
