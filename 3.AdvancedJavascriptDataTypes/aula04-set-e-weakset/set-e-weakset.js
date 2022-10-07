const assert = require('assert')

// usado na maioria das vezes para listas de itens únicos
const arrayOne = ["0", "1", "2"]
const arrayTwo = ["2", "0", "3"]
const arrayOneAndTwo = arrayOne.concat(arrayTwo)
// console.log('arrayOneAndTwo', arrayOneAndTwo);
assert.deepStrictEqual(arrayOneAndTwo, ["0", "1", "2", "2", "0", "3"])

const set = new Set()
arrayOne.map(item => set.add(item))
arrayTwo.map(item => set.add(item))
// console.log('set: ', set);
assert.deepStrictEqual(Array.from(set), ["0", "1", "2", "3"])
assert.deepStrictEqual(Array.from(new Set([...arrayOne, ...arrayTwo])), ["0", "1", "2", "3"])
// console.log('set.keys: ', set.keys());
// console.log('set.values: ', set.values()); // só existe por conta do Map (compatibilidade)

// no Array comum, para saber se um item existe, usamos o indexOf
// [].indexOf(1) // -1 ou [0].includes(0) // true
// no Set, usamos o has
assert.ok(set.has("1"))

// mesma teórica do Map, mas você sempre trabalha com a lista toda
// nõa tem get, então você pode saber se o item está ou não no array e é isso.
// Na documentação existe exemplos sobre como fazer interceção, união, diferença, etc...

/**
 * Tem nos dois arrays
 */
const usersOne = new Set([
  'erick',
  'guilherme',
  'pedroca'
])

const usersTwo = new Set([
  'fernando',
  'erick',
  'sabrina'
])

// os dois em comum entre essas duas lista de usuários é o erick. 
// Logo, na interseção, somente ele deve aparecer
const intersection = new Set([...usersOne].filter(user => usersTwo.has(user)))
assert.deepStrictEqual(Array.from(intersection), ['erick'])

const diference = new Set([...usersOne].filter(user => !usersTwo.has(user)))
assert.deepStrictEqual(Array.from(diference), ['guilherme', 'pedroca'])

/**
 * WeakSet
 * 
 * Mesma ideia do WeakMap, em termos de ciclo de vida ele trabalha somente com o que o garbage collector ainda não coletou
 * E somente pra adicionar novos itens e saber se um item existe na lista
 * 
 * Não é enumerável (iterável)
 * Só trabalha com chaves como referencia
 * Só tem métodos simples
 */

const user = {id: 123}
const otherUser = {id: 123}

const weakSet = new WeakSet([user])
weakSet.add(otherUser)
weakSet.delete(user)
weakSet.has(user)