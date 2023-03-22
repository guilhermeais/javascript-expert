import Product from '../src/entities/product.js'
import { randomUUID as uuid } from 'crypto'

export default class Cart {
  constructor({ at, products }) {
    this.id = uuid()
    this.at = at
    this.products = this.removeUndefinedProperties(products)
  }

  removeUndefinedProperties(products) {
    const results = []
    for (const product of products) {
      const keys = Reflect.ownKeys(product)

      if (!keys.length) {
        continue
      }

      // keys.forEach(key => {
      //   if (product[key] === undefined) {
      //     Reflect.deleteProperty(product, key)
      //   }
      // })

      let newObject = {}

      keys.forEach(key => {
        if (!keys[key]) return

        newObject[key] = product[key]
      })

      results.push(new Product(newObject))
    }

    return results
  }

  get totalPrice() {
    return this.products
      .map(product => product.price)
      .reduce((acc, price) => {
        return acc + price
      }, 0)
  }
}
