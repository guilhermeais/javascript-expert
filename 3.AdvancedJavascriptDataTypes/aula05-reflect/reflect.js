'use strict'
const assert = require('assert')

// Garantir semântica e segurança dos objetos

// -- apply
const someObj = {
  add(value) {
    return this.arg1 + this.arg2 + value
  },
}

assert.deepStrictEqual(someObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130)

// Um problema que pode acontecer (raro)
// Function.prototype.apply =  function (functionRef, thisArgs, argArray)  {
//   throw new Error('eita!')
// }

// Esse aqui pode acontecer!
someObj.add.apply = function () {
  throw new TypeError('some_error')
}
assert.throws(() => someObj.add.apply({}, []), {
  name: 'TypeError',
  message: 'some_error',
})

// Usando Reflect:
const result = Reflect.apply(someObj.add, { arg1: 40, arg2: 20 }, [200])
assert.deepStrictEqual(result, 260)
// -- apply

// -- defineProperty
function myDate() {}

// Feio demais! Object adicionando prop em uma function é muito estranho
Object.defineProperty(myDate, 'withObject', { value: () => 'Eita!' })
assert(myDate.withObject(), 'Eita!')

// Com o Reflect
Reflect.defineProperty(myDate, 'withReflection', { value: () => 'Eita!' })
assert.deepStrictEqual(myDate.withReflection(), 'Eita!')
// -- defineProperty

// --deleteProperty
const withDelete = {user: 'ErickWendel'}
// Imperformático, evitar ao máximo!
delete withDelete.user
assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false)

const withReflection = { user: 'Guilherme' }
Reflect.deleteProperty(withReflection)
assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false)
// --deleteProperty

// --get
// Deveríamos fazer um get somente em instâncias de referência
assert.deepStrictEqual(1['userName'], undefined)
// com reflection, uma exceção é lançada!
assert.throws(() => Reflect.get(1, 'userName'), TypeError)

// -- has
assert.ok('superman' in {superman: ''})
assert.ok(Reflect.has({batman: ''}, 'batman'))
// -- has

// -- ownKeys
const userSymbol = Symbol('user')
const myObj = {
  id: 1,
  [userSymbol]: 'Guilherme'
}

// Com os métodos object, temos que fazer 2 requisições para obter os symbols e keys
const objectKeys = [
  ...Object.getOwnPropertyNames(myObj),
  ...Object.getOwnPropertySymbols(myObj)
]
assert.deepStrictEqual(objectKeys, ['id', userSymbol])
// Com Reflection, uma chamada basta: 
assert.deepStrictEqual(Reflect.ownKeys(myObj), ['id', userSymbol])