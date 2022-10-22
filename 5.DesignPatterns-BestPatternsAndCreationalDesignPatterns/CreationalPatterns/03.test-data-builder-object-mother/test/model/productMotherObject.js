const ProductDataBuilder = require('./productDataBuilder')

/**
 * Use the ProductDataBuilder to create a Product object, like the facade pattern does to hide the complexity of the application.
 */
module.exports = class ProductMotherObject {
  static aValidProduct() {
    return ProductDataBuilder
    .aProduct()
    .build()
  }

  static aProductWithInvalidId() {
    return ProductDataBuilder
    .aProduct()
    .withInvalidId()
    .build()
  }

  static aProductWithInvalidName() {
    return ProductDataBuilder
    .aProduct()
    .withInvalidName()
    .build()
  }

  static aProductWithInvalidPrice() {
    return ProductDataBuilder
    .aProduct()
    .withInvalidPrice()
    .build()
  }

  static aProductWithInvalidCategory() {
    return ProductDataBuilder
    .aProduct()
    .withInvalidCategory()
    .build()
  }
}
