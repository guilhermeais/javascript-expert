import { createServer } from 'http'
import Events from 'events'

import { randomBytes } from 'crypto'

const myEvent = new Events()

function onData(date) {
  const items = []
  randomBytes(1000)
  items.push(date)
}
createServer(function serverHandler(req, res) {
  myEvent.on('data', onData)
  myEvent.emit('data', Date.now())
  res.end()
}).listen(3000, () => console.log('running on 3000'))
