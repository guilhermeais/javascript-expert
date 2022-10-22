const { expect } = require('chai')
const { test, describe } = require('mocha')
const { productValidator } = require('../src')
const ProductMotherObject = require('./model/productMotherObject')

describe('Test Mother Object', () => {
  test("shouldn't return error with valid product", () => {
    const product = ProductMotherObject.aValidProduct()

    const validationResult = productValidator(product)
    const expected = {
      isValid: true,
      errors: [],
    }

    expect(validationResult).to.deep.equal(expected)
  })

  describe('Product Validation Rules', () => {
    test('should return an object error when creating a Product with invalid id', () => {
      const product = ProductMotherObject.aProductWithInvalidId()

      const validationResult = productValidator(product)
      const expected = {
        isValid: false,
        errors: ['id: invalid length, should be between 2 and 20 characters'],
      }

      expect(validationResult).to.deep.equal(expected)
    })

    test('should return an object error when creating a Product with invalid name', () => {
      const product = ProductMotherObject.aProductWithInvalidName()

      const validationResult = productValidator(product)
      const expected = {
        isValid: false,
        errors: ['name: invalid name, should be only words'],
      }

      expect(validationResult).to.deep.equal(expected)
    })

    test('should return an object error when creating a Product with invalid price', () => {
      const product = ProductMotherObject.aProductWithInvalidPrice()

      const validationResult = productValidator(product)
      const expected = {
        isValid: false,
        errors: ['price: invalid price, should be from zero to a thousand'],
      }

      expect(validationResult).to.deep.equal(expected)
    })

    test('should return an object error when creating a Product with invalid category', () => {
      const product = ProductMotherObject.aProductWithInvalidCategory()

      const validationResult = productValidator(product)
      const expected = {
        isValid: false,
        errors: ['category: invalid category, should be one of the following: electronics, books, food, clothes'],
      }

      expect(validationResult).to.deep.equal(expected)
    })
  })
})
