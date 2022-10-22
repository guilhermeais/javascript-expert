const Product = require('../../src/entities/Product');

module.exports = class ProductDataBuilder {
  constructor() {
    this.productData = {
      id: '10',
      name: 'Product',
      price: 10,
      category: 'electronics'
    }
  }

  static aProduct() {
    return new ProductDataBuilder()
  }

  withInvalidId() {
    Reflect.deleteProperty(this.productData, 'id')
    return this;
  }

  withInvalidName() {
    this.productData.name = 'abc123'
    return this;
  }

  withInvalidPrice() {
    this.productData.price = 2000
    return this;
  }

  withInvalidCategory() {
    this.productData.category = 'invalid'
    return this;
  }

  build() {
    const product = new Product(this.productData)
    return product
  }
}