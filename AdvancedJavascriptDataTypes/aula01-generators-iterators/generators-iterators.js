const assert = require('assert')

function* calculate(arg1, arg2) {
  yield arg1 * arg2
}

function* main() {
  yield 'Hello'
  yield 'World'
  // se mandarmos a função sem o yield *, ele não vai entender e não vai executar a função
  //  yield calculate(2, 2) -> { value: Object [Generator] {}, done: false }
  // yield* calculate(2, 2) -> { value: 4, done: false }
  yield * calculate(2, 2)
}

const generator = main()

// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())

assert.deepStrictEqual(generator.next(), { value: 'Hello', done: false })
assert.deepStrictEqual(generator.next(), { value: 'World', done: false })
assert.deepStrictEqual(generator.next(), { value: 4, done: false })
assert.deepStrictEqual(generator.next(), { value: undefined, done: true })

// Pegar o valor do generator por Array.from
assert.deepStrictEqual(Array.from(main()), ['Hello', 'World', 4])

// Pegar o valor do generator por spread
assert.deepStrictEqual([...main()], ['Hello', 'World', 4])

/**
 * Async Interators
 */
const { readFile, stat, readdir } = require('fs/promises')

function* promisified() {
    yield readFile(__filename)
    yield Promise.resolve('heyyyy')
}

async function* systemInfo(){
    const file = await readFile(__filename)
    yield {
        file: file.toString()
    }

    const {size}  = await stat(__filename)

    yield { 
        size
    }

    const dir = await readdir(__dirname)
    yield {
        dir
    }
}

;(async () => {
    /**
     * Resolving async iterators with for await
     */
    for await (const item of systemInfo()){
        console.log('item resolved with for await:', item)
    }
})()