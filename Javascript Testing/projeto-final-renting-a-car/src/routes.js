module.exports = class Routes {
  constructor({
    rentService,
    calculateFinalPriceService,
    getAvailableCarService,
  } = {}) {
    this.rentService = rentService
    this.calculateFinalPriceService = calculateFinalPriceService
    this.getAvailableCarService = getAvailableCarService

    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }

  }

  async 'post:/rent'(req, res) {
    for await (const data of req) {
      try {
        const { customer, carCategory, numberOfDays } = JSON.parse(data)

        const result = await this.rentService.rent(
          customer,
          carCategory,
          numberOfDays
        )

        res.writeHead(200, this.defaultHeaders)
        res.write(JSON.stringify({ result }))
        res.end()
      } catch (error) {
        console.log(error);
        res.writeHead(500, this.defaultHeaders)
        res.write(JSON.stringify({ error: error.message }))
        res.end()
      }
    }

    return res.end()
  }

  async 'get:/rent/simulate'(req, res) {
    for await (const data of req) {
      try {
        const { customer, carCategory, numberOfDays } = JSON.parse(data)

        const result =
          await this.calculateFinalPriceService.calculateFinalPrice(
            customer,
            carCategory,
            numberOfDays
          )

        res.writeHead(200, this.defaultHeaders)
        res.write(JSON.stringify({ result }))
      } catch (error) {
        console.log(error);
        res.writeHead(500)
        res.write(JSON.stringify({ error }), this.defaultHeaders)
        res.end()
      }
    }
    
    return res.end()
  }

  async 'get:/cars'(req, res) {
    for await (const data of req) {
      try {
        const carCategory = JSON.parse(data)

        const result = await this.getAvailableCarService.getAvailableCar(
          carCategory
        )

        res.writeHead(200, this.defaultHeaders)
        res.write(JSON.stringify({ result }))
        res.end()
      } catch (error) {
        res.writeHead(500, this.defaultHeaders)
        res.write(JSON.stringify({ error: error.message }))
        res.end()
      }
    }
    return res.end()
  }

  async default(req, res) {
    res.write(JSON.stringify({ error: 'Invalid Route :/' }))
    return res.end()
  }
}
