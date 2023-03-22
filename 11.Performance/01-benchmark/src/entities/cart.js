import Product from './product.js'
import { randomUUID as uuid } from 'crypto'

export default class Cart {
  constructor({ at, products }) {
    this.id = uuid()
    this.at = at
    this.products = this.removeUndefinedProperties(products)
  }

  removeUndefinedProperties(products) {
    const productsEntities = products
      .filter(product => !!Reflect.ownKeys(product).length)
      .map(product => new Product(product))

    return JSON.parse(JSON.stringify(productsEntities))
  }

  get totalPrice() {
    return this.products
      .map(product => product.price)
      .reduce((acc, price) => {
        return acc + price
      }, 0)
  }
}
