import http from 'http'

let count = 1
async function handler(req, res) {
  count++
  try {
    if (count % 2 === 0) {
      await Promise.reject(new Error('Something went wrong at first'))
    }
    for await (const data of req) {
      try {
        if (count % 2 !== 0) {
          await Promise.reject(new Error('Something went wrong at second'))
        }
        res.end()
      } catch (error) {
        console.error('ServerError: ', error)
        res.writeHead(500)
        res.write(
          JSON.stringify({
            message: error.message,
          })
        )
        res.end()
      }
    }
  } catch (error) {
    console.error('ServerError: ', error)
    res.writeHead(500)
    res.write(
      JSON.stringify({
        message: error.message,
      })
    )
    res.end()
  }
}

http.createServer(handler).listen(3000, () => console.log('running at 3000'))
