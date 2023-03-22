import Benchmark from 'benchmark'
import CartIdNew from './cart-id-new.js'
import CartIdOld from './cart-id-old.js'
import CartRmPropNew from './cart-rm-prop-new.js'
import CartRmPropOld from './cart-rm-prop-old.js'
const suite = new Benchmark.Suite()

// suite
//   .add('Card#cardIdUUID', function () {
//     new CartIdOld()
//   })
//   .add('Card#cardIdCrypto', function () {
//     new CartIdNew()
//   })
//   .on('cycle', event => console.log(String(event.target)))
//   .on('complete', function () {
//     console.log(`Fastest is ${this.filter('fastest').map('name')}`)
//   })
//   .run()

const data = {
  at: new Date(),
  products: [
    {
      id: '1',
      name: 'Product 1',
      price: 10,
      sbc: '1',
      abc: null,
      terst: undefined,
    },
    {
      id: '1',
      name: 'Product 1',
      price: 10,
      sbc: '1',
      abc: null,
      terst: undefined,
    },
  ],
}
suite
  .add('Card#removePropertiesReduce', function () {
    new CartRmPropOld(data)
  })
  .add('Card#removePropertiesFor', function () {
    new CartRmPropNew(data)
  })
  .on('cycle', event => console.log(String(event.target)))
  .on('complete', function () {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`)
  })
  .run()
