import OrderBusiness from './business/OrderBusiness.js';
import Order from './entities/order.js';
const order = new Order({
  customerId: 1,
  amount: 100.000,
  products: [{
    id: 1,
    name: 'Camaro',
    price: 100,
    quantity: 1
  }]
})
const orderBusiness = new OrderBusiness()
const result = await orderBusiness.create(order)

console.log(result)