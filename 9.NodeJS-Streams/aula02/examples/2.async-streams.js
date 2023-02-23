import { Readable } from 'stream'
import { pipeline } from 'stream/promises'
import { setTimeout } from 'timers/promises'

async function* myCustomAsyncReadable() {
  yield Buffer.from('Hello')
  await setTimeout(10)
  yield Buffer.from('World')
  await setTimeout(100)
  yield Buffer.from('!')
  await setTimeout(10)
  yield Buffer.from('How are you?')
}

async function* myCustomAsyncWritable(stream) {
  for await (const chunk of stream) {
    console.log(`[writable]`, chunk)
  }
}

async function* myCustomAsyncTransform(stream) {
  for await (const chunk of stream) {
    yield chunk.toString().toUpperCase().replace(/\s/g, '_')
  }
}

async function* myCustomAsyncDuplex(stream) {
  let bytesRead = 0
  const wholeString = []
  for await (const chunk of stream) {
    console.log('[duplex writable]', chunk)
    bytesRead += chunk.length
    wholeString.push(chunk)
  }

  yield `[duplex readable] whole string is: ${wholeString.join(' ')}`
  yield `[duplex readable] bytes read: ${bytesRead}`
}

try {
  const abortController = new AbortController()
  // caso precise abortar a execução
  // abortController.abort()
  await pipeline(
    Readable.from(myCustomAsyncReadable()),
    myCustomAsyncTransform,
    myCustomAsyncDuplex,
    myCustomAsyncWritable,
    {
      signal: abortController.signal,
    }
  )
} catch (error) {
  console.error(error)
}
