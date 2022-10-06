const DEFAULT_TIMEOUT = 5000

const { join } = require('path')
const App = require('./app')
const BaseRepository = require('./repository/base/baseRepository')
const Routes = require('./routes')
const CarService = require('./service/carService')
const carsDatabase = join(__dirname, './../database', 'cars.json')

function carServiceFactory() {
  return new CarService({
    cars:carsDatabase
  })
}
const routes = new Routes({
  calculateFinalPriceService: carServiceFactory(),
  getAvailableCarService: carServiceFactory(),
  rentService: carServiceFactory(),
})

const app = new App(routes)

app
  .init(3005)
  .then(port => {
    console.log(`App running at ${port}`)
  })
  .catch(error => {
    console.log('Error on initialize app :/', error)
  })


process.on('SIGINT', () => {
  setTimeout(() => {
    process.exit(1)
  }, DEFAULT_TIMEOUT )
  console.log('Shutdown gracefully, waiting for unfinished requests...');

  app.close().then(() => {
    console.log('App closed!');
    process.exit()
  })
  .catch((error) => {
    console.log('Force close app!', error);
    process.exit(1)
  })
})