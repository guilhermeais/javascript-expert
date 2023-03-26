import { createReadStream } from 'fs'
import csvtojson from 'csv2json'
import { pipeline } from 'stream/promises'
import { Transform, Writable } from 'stream'
import { setTimeout } from 'timers/promises'

const database = process.argv[2]
async function onMessage(msg) {
  const firstTimeRan = new Map()
  await pipeline(
    createReadStream(database),
    csvtojson(),
    new Transform({
      transform(chunk, enc, cb) {
        try {
          const data = JSON.parse(chunk.toString())

          if (data.Name !== msg.Name) {
            return cb()
          }

          if (firstTimeRan.has(data.Name)) {
            return cb(null, chunk)
          }

          firstTimeRan.set(data.Name, true)
          cb()
        } catch (error) {
          cb()
        }
      },
    }),
    new Writable({
      write(chunk, encoding, callback) {
        if (!chunk) {
          return callback()
        }

        process.send(JSON.parse(chunk.toString()))
      },
    })
  )
}

process.on('message', onMessage)
await setTimeout(6000)
process.channel.unref()