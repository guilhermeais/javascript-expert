const { join } = require('path');
const { expect } = require('chai');
const { describe, test, before, beforeEach, afterEach } = require('mocha');
const CarService = require('../../src/service/carService');
const sinon = require('sinon');
const carsDatabase = join(__dirname, './../../database', 'cars.json');

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
      cars: carsDatabase
    })
  })

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  })

  afterEach(() => {
    sandbox.restore();
  })

  test('should retrieve a random position from an array', () => {
    const data = [0, 1, 2, 3, 4];
    const result = carService.getRandomPositionFromArray(data);

    expect(result).to.be.lte(data.length).and.be.gte(0);
  });

  test('should choose the first id from carIds in carCategory', async () => {
    const carCategory = mocks.validCarCategory;
    const carIdPosition = 0;
    sandbox.stub(carService, carService.getRandomPositionFromArray.name).returns(carIdPosition);

    const result = carService.chooseRandomCar(carCategory);
    const expected = carCategory.carIds[carIdPosition];

    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok;
    expect(result).to.be.equal(expected);
  });

  test('given a carCategory it should return an available car', async () => {
    const car = mocks.validCar
    const carCategory = Object.create(mocks.validCarCategory)
    carCategory.carIds = [car.id]

    sandbox.stub(
      carService.carRepository,
      carService.carRepository.find.name
    ).resolves(car)
     
    const result = await carService.getAvailableCar(carCategory);
    const expected = car
    
    expect(carService.carRepository.find.calledOnceWithExactly(car.id)).to.be.ok;
    expect(result).to.be.deep.equal(expected)
  });
})
