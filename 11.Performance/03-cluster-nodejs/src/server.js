import { appendFile } from 'fs/promises'
import { createServer } from 'http'

async function handler(request, response) {
  await appendFile('log.txt', `processed by ${process.pid}\n`)

  const result = Array.from({ length: 1e3 }, () => Math.random() * 40).reduce(
    (acc, value) => acc + value,
    0
  )

  response.end(`Result: ${result}`)
}

const server = createServer(handler)

function initializeServer(port = 3000) {
  server.listen(port, () =>
    console.log(`Running at port ${port} and proccess (pid) ${process.pid}`)
  )

  return server
}

export default initializeServer
