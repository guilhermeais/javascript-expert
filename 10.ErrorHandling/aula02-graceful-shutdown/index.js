import { MongoClient } from 'mongodb'
import { createServer } from 'http'
import { promisify } from 'util'
import { setTimeout } from 'timers/promises'

async function dbConnect() {
  const client = new MongoClient('mongodb://localhost:27017')
  await client.connect()

  console.log('Connected to MongoDB')

  const db = client.db('comics')

  return {
    collections: {
      heroes: db.collection('heroes'),
    },
    client,
  }
}

const { client, collections } = await dbConnect()
async function handler(req, res) {
  for await (const data of req) {
    try {
      const hero = JSON.parse(data)
      await collections.heroes.insertOne({
        ...hero,
        updatedAt: new Date().toISOString(),
      })
      
      await setTimeout(20000)
      const heroes = await collections.heroes.find().toArray()

      console.log('heroes', heroes)

      res.writeHead(200)
      res.write(
        JSON.stringify({
          heroes,
        })
      )
    } catch (error) {
      console.log('Error', error)
      res.writeHead(500)
      res.write(
        JSON.stringify({
          error: 'Internal Server Error',
        })
      )
    } finally {
      res.end()
    }
  }
}
// await client.close()

/**
 * curl -i localhost:3000 -X POST -H "Content-Type: application/json" --data '{"name": "Flash", "power": "Speed"}'
 */
const server = createServer(handler).listen(3000, () => {
  console.log(`Server is running on port 3000 and process id is ${process.pid}`)
})

const onStop = async signal => {
  console.log(`\nProcess ${process.pid} has received signal ${signal}`)

  console.log('Closing HTTP server')
  await promisify(server.close.bind(server))()
  console.log('HTTP server closed')

  console.log('Closing MongoDB connection')
  await client.close()
  console.log('MongoDB connection closed')
}

;['SIGINT', 'SIGTERM'].forEach(event => process.on(event, onStop))
