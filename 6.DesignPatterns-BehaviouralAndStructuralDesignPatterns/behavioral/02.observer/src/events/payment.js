export class Payment {
  constructor(paymentSubject) {
    this.paymentSubject = paymentSubject;
  }
  creditCard(paymentData) {
    console.log(`\na payment ocurred from ${paymentData.username} with credit card`);
    this.paymentSubject.notify(paymentData);
  }
}