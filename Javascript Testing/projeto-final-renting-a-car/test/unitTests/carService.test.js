const { join } = require('path')
const { expect } = require('chai')
const { describe, test, before, beforeEach, afterEach } = require('mocha')
const CarService = require('../../src/service/carService')
const Transaction = require('../../src/entities/transaction')
const sinon = require('sinon')
const carsDatabase = join(__dirname, './../../database', 'cars.json')

const mocks = {
  validCarCategory: require('./../mocks/valid-carCategory.json'),
  validCar: require('./../mocks/valid-car.json'),
  validCustomer: require('./../mocks/valid-customer.json'),
}
describe('CarService Suite Tests', () => {
  let carService = {}
  let sandbox = {}
  before(() => {
    carService = new CarService({
      cars: carsDatabase,
    })
  })

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  test('should retrieve a random position from an array', () => {
    const data = [0, 1, 2, 3, 4]
    const result = carService.getRandomPositionFromArray(data)

    expect(result).to.be.lte(data.length).and.be.gte(0)
  })

  test('should choose the first id from carIds in carCategory', async () => {
    const carCategory = mocks.validCarCategory
    const carIdPosition = 0
    sandbox
      .stub(carService, carService.getRandomPositionFromArray.name)
      .returns(carIdPosition)

    const result = carService.chooseRandomCar(carCategory)
    const expected = carCategory.carIds[carIdPosition]

    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok
    expect(result).to.be.equal(expected)
  })

  test('given a carCategory it should return an available car', async () => {
    const car = mocks.validCar
    const carCategory = Object.create(mocks.validCarCategory)
    carCategory.carIds = [car.id]

    sandbox
      .stub(carService.carRepository, carService.carRepository.find.name)
      .resolves(car)

    const result = await carService.getAvailableCar(carCategory)
    const expected = car

    expect(carService.carRepository.find.calledOnceWithExactly(car.id)).to.be.ok
    expect(result).to.be.deep.equal(expected)
  })

  test('given a carCategory, customer and numberOfDays it should calculate final amount in real', () => {
    const customer = Object.create(mocks.validCustomer)
    customer.age = 50

    const carCategory = Object.create(mocks.validCarCategory)
    carCategory.price = 37.6

    const numberOfDays = 5

    // age: 50 - 1.3% tax  - categoryPrice 37.6
    // 37.6 * 1.3 = 48,88 * 5 days = 244.40

    // não depende de dados externos
    sandbox
      .stub(carService, 'taxesBasedOnAge')
      .get(() => [{ from: 40, to: 50, then: 1.3 }])

    const expected = carService.currencyFormat.format(244.4)
    const result = carService.calculateFinalPrice(
      customer,
      carCategory,
      numberOfDays
    )

    expect(result).to.be.deep.equal(expected)
  })

  test('given a customer and a car category it should return a transaction receipt', async () => {
    const car = mocks.validCar
    const carCategory = {
      ...mocks.validCarCategory,
      price: 37.6,
      carIds: [car.id],
    }
    sandbox.stub(carService.carRepository, carService.carRepository.find.name).returns(car)
    const customer = Object.create(mocks.validCustomer)
    customer.age = 20

    const numberOfDays = 5
    const dueDate = '10 de novembro de 2020'

    // moca a data no teste
    const now = new Date(2020, 10, 5)
    sandbox.useFakeTimers(now.getTime(0))

     // não depende de dados externos
     sandbox
     .stub(carService, 'taxesBasedOnAge')
     .get(() => [{ from: 18, to: 20, then: 1.1 }])

    // age: 20, tax: 1.1, categoryPrice: 37.6
    // 37.6 * 1.1 = 41.35 * 5 days = 206.8
    const expectedAmount = carService.currencyFormat.format(206.8)
    const result = await carService.rent(customer, carCategory, numberOfDays)
    const expected = new Transaction({
      customer,
      car,
      dueDate,
      amount: expectedAmount,
    })

    expect(result).to.be.deep.equal(expected)
  })
})
