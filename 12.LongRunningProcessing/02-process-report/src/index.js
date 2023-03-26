import { fork } from 'child_process'
import { createReadStream } from 'fs'
import csvtojson from 'csv2json'
import { join } from 'path'
import { pipeline } from 'stream/promises'
import * as url from 'url'
import { Writable } from 'stream'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const databaseFile = join(__dirname, '../data/All_Pokemon.csv')
const PROCESS_COUNT = 10

const backgroundTaskFile = join(__dirname, './backgroundTask.js')
const replications = new Set()
const processes = new Map()
for (let i = 0; i < PROCESS_COUNT; i++) {
  const child = fork(backgroundTaskFile, [databaseFile])
  child.on('exit', () => {
    processes.delete(child.pid)
    console.log(`process ${child.pid} exited`)
  })

  child.on('error', err => {
    console.log(`process ${child.pid} errored with ${err}`)
    process.exit(1)
  })

  child.on('message', msg => {
    if (replications.has(msg.Name)) {
      return
    }

    replications.add(msg.Name)
    console.log('message from child: ', msg.Name)
  })

  processes.set(child.pid, child)
}

// 100 mensagens
// 10 processos
// teriamos que enviar 10 mensagens para cada processo (isso é a ideia do round robin, balancear a carga)
function roundRobin(processes, index = 0) {
  return function () {
    const isFinished = processes.length === index
    if (isFinished) {
      index = 0
    }

    const process = processes[index++]

    return process
  }
}

// Vai enviar a mensagem para todos os processos
// Load Balancer
const getProcess = roundRobin([...processes.values()])

console.log(`starting with ${processes.size} processes`)
await pipeline(
  createReadStream(databaseFile),
  csvtojson(),
  new Writable({
    write(chunk, encoding, callback) {
      try {
        const chosenProcess = getProcess()

        chosenProcess.send(JSON.parse(chunk.toString()))
      } catch {}
      callback()
    },
  })
)
