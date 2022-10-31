import BaseBusiness from './base/BaseBusiness.js';

export default class OrderBusiness extends BaseBusiness {
  #order = new Set()

  _validateRequiredFields(order) {
    return order.customerId && order.amount && Array.isArray(order.products) && order.products.length > 0
  }

  async _create(order) {
    this.#order.add(order)
    return true
  }
}