import { randomUUID } from 'crypto'
import { createWriteStream } from 'fs'
import { createServer } from 'http'
import { pipeline } from 'stream/promises'

async function handler(request, response) {
  const filename = `file-${randomUUID()}.csv`
  await pipeline(
    request,
    createWriteStream(filename),
  )

  response.end('uploaded!')
}

createServer(handler).listen(3000, () =>
  console.log('Server is listening on port 3000')
)
