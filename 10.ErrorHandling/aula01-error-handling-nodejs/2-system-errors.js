import timersPromise from 'timers/promises'

// const results = [1, 2, 3].map(async number=> {
//   console.log('stating async process!')
//   await timersPromise.setTimeout(100)
//   console.log(await Promise.resolve(`step ${number}...`))
//   console.log('done!')

//   return parseInt(number) * 2
// })

// console.log('results', await Promise.all(results))

setTimeout(async () => {
  console.log('stating async process!')
  await timersPromise.setTimeout(100)
  console.count('debug')
  console.log(await Promise.resolve('step 1...'))
  await timersPromise.setTimeout(100)
  console.log(await Promise.resolve('step 2...'))
  console.log('done!')
  console.count('debug')

  await Promise.reject(new Error('Something went wrong!'))
}, 1000)

const throwError = msg => {
  throw new Error(msg)
}

try {
  throwError('Error inside try/catch')
} catch (error) {
  console.log('on catch: ', error.message)
} finally {
  console.log('on finally')
}

process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error)
})

process.on('uncaughtException', error => {
  console.log('uncaughtException', error)
})

// Se estiver dentro de uma promise ou em outro contexto assíncrono, o erro será capturado no unhandledRejection
Promise.reject('promise rejected!')

// Se o erro for lançado dentro de um setTimeout, o erro será capturado no uncaughtException
setTimeout(() => {
  throwError('Error inside setTimeout')
})

// Se estiver fora de uma promise ou em outro contexto assíncrono, o erro será capturado no uncaughtException
{
  await Promise.reject('promise rejected as uncaughtException!')
}
