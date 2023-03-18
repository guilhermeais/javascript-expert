import { createServer } from 'http'
import BusinessError from './errors/businessError.js'
import { statusCodes } from './util/httpStatusCodes.js'

function validatePerson(person) {
  if (person.age < 20) {
    throw new BusinessError('age must be higher than 20!')
  }

  if (person?.name.length < 4) {
    throw new BusinessError('name length must be higher than 4!')
  }

  // simulando outro erro, por exemplo, um erro de conexão com o banco de dados
  if (Reflect.has(person, 'connectionError')) {
    throw new Error('error connecting to database')
  }
}

async function handler(request, response) {
  for await (const data of request) {
    try {
      const person = JSON.parse(data)
      validatePerson(person)
      response.writeHead(statusCodes.OK, { 'Content-Type': 'application/json' })
      response.write(JSON.stringify(person))
      return response.end()
    } catch (error) {
      console.error(error)
      if (error instanceof BusinessError) {
        response.writeHead(statusCodes.BAD_REQUEST, {
          'Content-Type': 'application/json',
        })
        response.write(JSON.stringify({ error: error.message }))
        return response.end()
      }

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
