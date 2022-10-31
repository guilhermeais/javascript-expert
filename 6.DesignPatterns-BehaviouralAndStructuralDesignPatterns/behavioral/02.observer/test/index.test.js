import { expect, describe, test, jest, beforeAll } from '@jest/globals'
import { Payment } from '../src/events/payment';
import Marketing from '../src/observers/marketing';
import { Shipment } from '../src/observers/shipment';
import { PaymentSubject } from '../src/subjects/payment-subject';

describe('Test Suite for Observer Pattern', () => {
  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  })
  class ObserverStub {
    update = jest.fn() 
  }

  class PaymentSubjectStub {
    notify = jest.fn()
    subscribe = jest.fn()
    unsubscribe = jest.fn()
  }
  describe('PaymentSubject', () => {
    describe('notify()', () => {
      test('should notify all observers', () => {
        const subject = new PaymentSubject();
       
        const observer = new ObserverStub();
        subject.subscribe(observer);
        const data = 'hello world'
        subject.notify(data)
        expect(observer.update).toHaveBeenCalledWith(data)
      })
      test('should not notify unsubscribed observers', () => {
        const subject = new PaymentSubject();
       
        const observer = new ObserverStub();
        subject.subscribe(observer);
        subject.unsubscribe(observer)
        const data = 'hello world'
        subject.notify(data)
        expect(observer.update).not.toHaveBeenCalledWith(data)
      })
    });
  });

  describe('Payment', () => {
    test('should notify subject after a credit card transaction', () => {
      const paymentSubject = new PaymentSubjectStub();
      const payment = new Payment(paymentSubject)
      const data = {
        username: 'john doe',
        amount: 100,
        id: 1
      }

      payment.creditCard(data)
      expect(paymentSubject.notify).toHaveBeenCalledWith(data)
    })
  });

  describe('All', () => {
    test('should notify subscribers after a credit card payment', () => {
      const paymentSubject = new PaymentSubject();
      const shipment = new Shipment()
      jest.spyOn(shipment, 'update')
      const marketing = new Marketing()
      jest.spyOn(marketing, 'update')
      const payment = new Payment(paymentSubject)
      const data = {
        username: 'john doe',
        amount: 100,
        id: 1
      }

      paymentSubject.subscribe(shipment);
      paymentSubject.subscribe(marketing);
      payment.creditCard(data)
      expect(shipment.update).toHaveBeenCalledWith(data)
      expect(marketing.update).toHaveBeenCalledWith(data)
    })
  })
});