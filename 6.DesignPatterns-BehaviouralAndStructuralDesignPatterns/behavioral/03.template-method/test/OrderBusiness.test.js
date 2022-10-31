import { test, describe, jest, expect, beforeEach } from '@jest/globals'
import OrderBusiness from '../src/business/OrderBusiness'
import Order from '../src/entities/order'

describe('OrderBusiness', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })
  describe('_validateRequiredFields()', () => {
    test('should return true if a valid order is provided', () => {
      const orderBusiness = new OrderBusiness()
      
      const order = new Order({
        customerId: 1,
        amount: 100.000,
        products: [{
          id: 1,
          name: 'valid_product_name',
          price: 100,
          quantity: 1
        }]
      })
      const result = orderBusiness._validateRequiredFields(order)
      expect(result).toBeTruthy()
    })
  })

  describe('_create()', () => {
    test('should return true on creating a order', async () => {
      const orderBusiness = new OrderBusiness()
      const order = new Order({
        customerId: 1,
        amount: 100.000,
        products: [{
          id: 1,
          name: 'valid_product_name',
          price: 100,
          quantity: 1
        }]
      })
      const result = await orderBusiness.create(order)
      expect(result).toBeTruthy()
    });
  });

  describe('create()', () => {
    test('should call _validateRequiredFields and _create on create', async () => {
      const orderBusiness = new OrderBusiness()
      const order = new Order({
        customerId: 1,
        amount: 100.000,
        products: [{
          id: 1,
          name: 'valid_product_name',
          price: 100,
          quantity: 1
        }]
      })

      const spyValidateRequiredFields = jest.spyOn(orderBusiness, orderBusiness._validateRequiredFields.name)
      const spyCreate = jest.spyOn(orderBusiness, orderBusiness._create.name)

      const result = await orderBusiness.create(order)

      expect(spyValidateRequiredFields).toHaveBeenCalledWith(order)
      expect(spyCreate).toHaveBeenCalledWith(order)
      expect(result).toBeTruthy()
    });
  })
})
