import os from 'os'
import cluster from 'cluster'
import initializeServer from './server.js'

(() => {
  // caso não seja o processo principal, ele pode ser um worker
  if (!cluster.isPrimary) {
    initializeServer()
    return;
  }    

  const cpusNumber = os.cpus().length
  console.log(`Primary ${process.pid} is running...`)
  console.log(`Forking ${cpusNumber} workers...`)

  for (let i = 0; i < cpusNumber; i++) {
    cluster.fork()

    // caso o processo filho morra, ele é reiniciado / forkado
    cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`)

      if (code !== 0 && !worker.exitedAfterDisconnect) {
        console.log('Starting a new worker...')
        cluster.fork()
      }
    })

  }
})()

