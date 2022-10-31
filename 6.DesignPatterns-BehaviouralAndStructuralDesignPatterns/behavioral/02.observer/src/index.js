import { Payment } from './events/payment.js';
import Marketing from './observers/marketing.js';
import { Shipment } from './observers/shipment.js';
import { PaymentSubject } from './subjects/payment-subject.js';

const subject = new PaymentSubject()

const marketingObserver = new Marketing()
const shipmentObserver = new Shipment()

subject.subscribe(marketingObserver)
subject.subscribe(shipmentObserver)

const payment = new Payment(subject)
payment.creditCard({
  username: 'john doe',
  amount: 100,
  id: Date.now()
})

console.log('\nremoves marketing observer');
subject.unsubscribe(marketingObserver)

payment.creditCard({
  username: 'mary doe',
  amount: 100,
  id: Date.now()
})