import { createServer } from 'http'
import PersonEntity from './person.js'
import { statusCodes } from './util/httpStatusCodes.js'

async function handler(request, response) {
  for await (const data of request) {
    try {
      const parsedData = JSON.parse(data)
      const person = new PersonEntity(parsedData)

      if (!person.isValid()) {
        response.writeHead(statusCodes.BAD_REQUEST)
        response.end(
          JSON.stringify({
            error: person.notifications.join('\n'),
          })
        )

        continue;
      }
      response.writeHead(statusCodes.OK, { 'Content-Type': 'application/json' })
      response.write(JSON.stringify(parsedData))
      return response.end()
    } catch (error) {
      console.error(error)
      response.writeHead(statusCodes.INTERNAL_SERVER_ERROR, {
        'Content-Type': 'application/json',
      })
      response.write(JSON.stringify({ error: 'Internal Server Error' }))
      return response.end()
    }
  }
}

const server = createServer(handler)

server.listen(3000, () => {
  console.info('Server running at http://localhost:3000')
})

/**
 * curl -i localhost:3000 -X POST --data '{"name": "Teste", "age": 18}'
 */
