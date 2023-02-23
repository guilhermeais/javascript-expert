import http from 'http'
import { Readable } from 'stream'

function apiOne(request, response) {
  // escreve na writable stream response
  // response.write(
  //   'Hello World\n'
  // )

  // passa a stream para o response
  // request.pipe(
  //   response
  // )
  let count = 0
  const maxItems = 99
  const readableStream = new Readable({
    read() {
      const everySecond = intervalContext => {
        if (count++ <= maxItems) {
          this.push(
            JSON.stringify({
              id: Date.now() + count,
              name: `Item-${count}`,
            })+'\n'
          )
          return;
        }

        clearInterval(intervalContext)
        this.push(null)
      }

      setInterval(function () {
        everySecond(this)
      })
    },
  })

  // todo fluxo de dados que passa pela readableStream vai passar pela response
  readableStream.pipe(response)
}

function apiTwo(request, response) {
  let count = 0
  const maxItems = 99
  const readableStream = new Readable({
    read() {
      const everySecond = intervalContext => {
        if (count++ <= maxItems) {
          this.push(
            JSON.stringify({
              id: Date.now() + count,
              name: `Product-${count}`,
            })+'\n'
          )
          return;
        }

        clearInterval(intervalContext)
        this.push(null)
      }

      setInterval(function () {
        everySecond(this)
      }, 500)
    },
  })

  // todo fluxo de dados que passa pela readableStream vai passar pela response
  readableStream.pipe(response)
}

http
  .createServer(apiOne)
  .listen(3000, () => console.info('server running at 3000!'))
http
  .createServer(apiTwo)
  .listen(3001, () => console.info('server running at 3001!'))
