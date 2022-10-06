const assert = require('assert')
const myMap = new Map()

// pode ter qualquer coisa como chave
myMap
  .set(1, 'one')
  .set(true, () => 'true')
  .set('string', { name: 'string' })

// usando um construtor
const myMapWithConstructor = new Map([
  [1, 'one'],
  [true, () => 'true'],
  ['string', { name: 'string' }],
])

// console.log('myMap: ', myMap);
// console.log('myMap.get(1): ', myMap.get(1));
assert.deepStrictEqual(myMap.get(1), 'one')
assert.deepStrictEqual(myMap.get(true)(), 'true')
assert.deepStrictEqual(myMap.get('string'), { name: 'string' })

// Em Objects as chaves só podem ser string ou symbol (number é coergido a String)
const onlyReferenceWorks = { id: 1 }
myMap.set(onlyReferenceWorks, { name: 'Guilherme' })
// console.log('get key by object reference: ', myMap.get(onlyReferenceWorks));
assert.deepStrictEqual(myMap.get({ id: 1 }), undefined)
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'Guilherme' })

/**
 * Utilitários
 *
 * No Object para obter as chaves do objeto, temos o Object.keys({a: 1}).length
 * No Map, temos a propriedade size
 */
assert.deepStrictEqual(myMap.size, 4)

/**
 * Para verificar se um item existe no objeto
 *
 * objeto.key = se a key não existe = undefined
 * if(objeto.key) = coerção implícita para boolean e retorna false
 * O jeito certo é: ({name: 'Guilherme'}).hasOwnProperty('name')
 * No Map, temos o método has
 */
assert.ok(myMap.has(onlyReferenceWorks))

/**
 * Para remover o item do objeto
 *
 * delete objeto.key -> imperformático para o Javascript
 * No Map, temos a propriedade delete, onde também nos retorna true ou false se foi removido ou não
 */
assert.ok(myMap.delete(onlyReferenceWorks))
assert.equal(myMap.delete(onlyReferenceWorks), false)

/**
 * Não da pra iterar em Objects diretamente, temos que transformar com o Object.entries(objeto)
 */
assert.deepStrictEqual(
  JSON.stringify([...myMap]),
  JSON.stringify([
    [1, 'one'],
    [true, ()=>{}],
    ['string', { name: 'string' }],
  ])
)

/**
 * Map implementa o generator
 */
// for (const [key, value] of myMap) {
//   console.log({key, value});
// }

// O Object é inseguro, pois dependendo o nome da chave, pode substituir algum comportamento padrão
// ({}).toString() => '[object Object]'
// ({toString: () => 'Hey'}).toString() === 'Hey'

// Qualquer chave pode colidir com as propriedades herdadas do objeto, como:
// constructor, toString, valueOf e etc...


// Já no Map não temos restrição de chave e nada disso acontece:
const actor = {
  name: 'Guilherme',
  toString: 'Eita'
}

myMap.set(actor)
assert.ok(myMap.has(actor))
assert.throws(() => myMap.get(actor).toString, TypeError)

// Não tem como limpar um objeto sem reassina-lo
myMap.clear()
assert.equal(myMap.size, 0)

/**
 * No fim, na prática podemos utilizar a estrutura Map invés do Object, quando:
 * 
 * Precisa adicionar chaves com frequência;
 * Precisa validar se a chave existe de forma semântica;
 * Precisa que o objeto funcione como um banco de dados;
 * Precisa limpar referência após o uso.
 */


/**
 * WeakMap
 */

// Pode ser coletado após perder as referencias
// Tem a maioria dos benefícios do Map
// mas não é iterável

// Só chaves de referencia e que você já conheça (object e symbol)
// Mais leve e preve leak de memoria, já que o Map mesmo que o garbage collector limpe os objetos que estão na referencia dele, ele permanece referenciando estes objetos
// como uma cópia. 
// Já no WeakMap, tudo sai da memoria, se o garbage collector limpe algum objeto, ele não fica com cópia

// const weakMap = new WeakMap()
// const hero = {name: 'Batman'}

// weakMap.set(hero)
// weakMap.get(hero)
// weakMap.delete(hero)
// weakMap.has(hero)