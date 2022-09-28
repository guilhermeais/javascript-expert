const Tax = require('../entities/tax')
const Transaction = require('../entities/transaction')
const BaseRepository = require('../repository/base/baseRepository')

module.exports = class CarService {
  constructor({ cars } = {}) {
    this.carRepository = new BaseRepository({ file: cars })
    this.taxesBasedOnAge = Tax.taxesBasedOnAge
    this.currencyFormat = new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  getRandomPositionFromArray(list) {
    const listLength = list.length
    return Math.floor(Math.random() * listLength)
  }

  chooseRandomCar(carCategory) {
    const randomPosition = this.getRandomPositionFromArray(carCategory.carIds)
    const carId = carCategory.carIds[randomPosition]

    return carId
  }

  async getAvailableCar(carCategory) {
    if (!this.carRepository) {
      throw new Error('Missing dependency carRepository!')
    }
    const carId = this.chooseRandomCar(carCategory)
    const car = await this.carRepository.find(carId)

    return car
  }

  calculateFinalPrice(customer, carCategory, numberOfDays) {
    const { age } = customer
    const { price } = carCategory
    const { then: tax } = this.taxesBasedOnAge.find(tax => age >= tax.from && age <= tax.to)
    const finalPrice = ((tax * price) * (numberOfDays))
    const formattedPrice = this.currencyFormat.format(finalPrice) 

    return formattedPrice
  }

  async rent(customer, carCategory, numberOfDays) {
    if (!customer || !customer.id) {
      throw new Error('Invalid customer.')
    }

    if (!carCategory || !carCategory.id) {
      throw new Error('Invalid carCategory.')
    }

    if (numberOfDays < 0 || typeof numberOfDays !== 'number' ) {
      throw new Error('Invalid numberOfDays.')
    }
    
    const car = await this.getAvailableCar(carCategory)
    const finalPrice = this.calculateFinalPrice(customer, carCategory, numberOfDays)

    const today = new Date()
    today.setDate(today.getDate() + numberOfDays)
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    const dueDate = today.toLocaleDateString('pt-br', options)

    const transaction = new Transaction({
      customer,
      car,
      amount: finalPrice,
      dueDate
    })

    return transaction
  }
}
