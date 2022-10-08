'use strict'

const Event = require('events')
const event = new Event()
const eventName = 'counter'
event.on(eventName, msg=> console.log('counter updated: ', msg))

const counter = {
  counter: 0
}
const proxy = new Proxy(counter, {
  set: (target, propertyKey, newValue) => {
    event.emit(eventName, { newValue, oldValue: target[propertyKey] })
    target[propertyKey] = newValue

    return true
  },
  get: (target, propertyKey)=> {
    // console.log('[GET]', propertyKey, target[propertyKey]);
    return target[propertyKey]
  }
})

// jajá e sempre
setInterval(function (){
  console.log('[3]: setInterval');

  proxy.counter++
  if (proxy.counter === 10) {
    clearInterval(this)
  }
}, 200)

// futuro
setTimeout(() => {
  console.log('[2]: setTimeout');
  proxy.counter = 3
}, 100)

// se quero que executa agora temos o setImmediate
setImmediate(() => {
  console.log('[1]: setImmediate', proxy.counter);
  proxy.counter = 4
})

//executa agora, mas acaba com o clico de vida do node
// Interrompe a fila e executa
process.nextTick(() => {
  console.log('[0] nextTick (quebra a fila e executa)');
  proxy.counter =2 
})