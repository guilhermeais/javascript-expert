const BaseRepository = require('../repository/base/baseRepository');

module.exports = class CarService {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars });
  }

  getRandomPositionFromArray(list) {
    const listLength = list.length;
    return Math.floor(Math.random() * listLength); 
  }

  chooseRandomCar(carCategory) {
    const randomPosition = this.getRandomPositionFromArray(carCategory.carIds);
    const carId = carCategory.carIds[randomPosition];

    return carId;
  }
  
  async getAvailableCar(carCategory) {
    const carId = this.chooseRandomCar(carCategory);
    const car = await this.carRepository.find(carId);
    
    return car
  }
}