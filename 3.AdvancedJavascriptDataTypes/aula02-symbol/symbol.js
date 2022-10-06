const assert = require('assert')

// --key, cada vez que chamamos o symbol, ele cria um endereço totalmente novo na memória
const uniqueKey = Symbol('name')
const user = {}

user['name'] = 'value for normal Objects'
user[uniqueKey] = 'value for symbol'

assert.deepStrictEqual(user.name, 'value for normal Objects')
// sempre único
assert.deepStrictEqual(user[Symbol('name')], undefined)
assert.deepStrictEqual(user[uniqueKey], 'value for symbol')

// é dificil de pegar, mas não é secreto!
// console.log('symbols:', Object.getOwnPropertySymbols(user));
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey)

// byPass - má prática (nem tem no codebase do Node)
user[Symbol.for('password')] = 123
assert.deepStrictEqual(user[Symbol.for('password')], 123)
// -- key

// Well Known Symbols
const obj = {
  // iterator
  [Symbol.iterator]: () => ({
    items: ['c', 'b', 'a'],
    next() {
      return {
        done: this.items.length === 0,
        // remove o último item do array e retorna
        value: this.items.pop(),
      }
    },
  }),
}

// for (const item of obj) {
//   console.log('item: ', item);
// }
assert.deepStrictEqual([...obj], ['a', 'b', 'c'])

const kItems = Symbol('kItems')
class MyDate {
  constructor(...dateArray) {
    this[kItems] = dateArray.map(date => new Date(...date))
  }

  get [Symbol.toStringTag]() {
    return 'MUDEI A TAG DO OBJETO'
  }

  [Symbol.toPrimitive](coercionType) {
    if (coercionType !== 'string') {
      throw new TypeError()
    }
    const items = this[kItems].map(item => {
      return new Intl.DateTimeFormat('pt-BR', {
        month: 'long',
        day: '2-digit',
        year: 'numeric'
      }).format(item)
    })
    return new Intl.ListFormat('pt-br', { style: 'long', type: 'conjunction'}).format(items)
  }

  *[Symbol.iterator]() {
    for (const item of this[kItems]) {
      yield item
    }
  }

  async *[Symbol.asyncIterator]() {
    const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))
    for (const item of this[kItems]) {
      await timeout(100)
      yield item.toISOString()
    }
  }
}

const myDate = new MyDate([2020, 01, 01], [2003, 01, 01])

const expectedDates = [new Date(2020, 01, 01), new Date(2003, 01, 01)]

assert.deepStrictEqual(
  Object.prototype.toString.call(myDate),
  '[object MUDEI A TAG DO OBJETO]'
)

// Vai chamar o Symbol.toPrimitive:
assert.throws(() => myDate+1, TypeError) // Conversão para número implícita

// Vai chamar o Symbol.toPrimitive (data começa no 0): 
assert.deepStrictEqual(String(myDate), '01 de fevereiro de 2020 e 01 de fevereiro de 2003')

// implementar o iterator
assert.deepStrictEqual([...myDate], expectedDates)

// implementar os async iterators
// ;(async () => {
//   for await (const item of myDate) {
//     console.log('asyncIterator', item);
//   }
// })()

;(async () => {
  const dates = []

  for await (const date of myDate) { dates.push(date) }
  
  const expectedDatesInISOString = expectedDates.map(item => item.toISOString())
  
  assert.deepStrictEqual(dates, expectedDatesInISOString)
})()