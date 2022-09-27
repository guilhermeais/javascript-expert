const { faker } = require('@faker-js/faker')
const Car = require('../src/entities/car')
const CarCategory = require('../src/entities/carCategory')
const Customer = require('../src/entities/customer')
const { join } = require('path')
const { writeFile } = require('fs/promises')

const seederBaseFolder = join(__dirname, '../', 'database')
const ITEMS_AMOUNT = 2 
const carCategory = new CarCategory({
  id: faker.datatype.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount(20, 100)
})

const cars = []
const customers = []

for (let i = 0; i < ITEMS_AMOUNT; i++) {
  const car = new Car({
    id: faker.datatype.uuid(),
    name: faker.vehicle.model(),
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.past().getFullYear()
  })
  cars.push(car)
  carCategory.carIds.push(car.id)

  const customer = new Customer({
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    age: faker.datatype.number({
      min: 18,
      max: 60
    }),
  })

  customers.push(customer)
}

const write = (filename, data) => writeFile(join(seederBaseFolder, filename), JSON.stringify(data))
;(async () => {
  await write('cars.json', cars)
  await write('carCategories.json', [carCategory])
  await write('customers.json', [customers])
})()