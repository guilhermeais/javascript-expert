const Service = require('./service')
const sinon = require('sinon');
const { deepStrictEqual } = require('assert');
const BASE_URL_PLANET_ONE = 'https://swapi.dev/api/planets/1'
const BASE_URL_PLANET_TWO = 'https://swapi.dev/api/planets/2'

const mocks = {
  planetOne: require('../mocks/planetOne.json'),
  planetTwo: require('../mocks/planetTwo.json'),
}

;(async () => {
  const service = new Service()
  const stub = sinon.stub(service, service.makeRequest.name)

  stub.withArgs(BASE_URL_PLANET_ONE).resolves(mocks.planetOne)
  stub.withArgs(BASE_URL_PLANET_TWO).resolves(mocks.planetTwo)

  {
    const exptected = {
      name: mocks.planetOne.name,
      surfaceWater: mocks.planetOne.surface_water,
      appearedIn: mocks.planetOne.films.length
    }
    const result = await service.getPlanets(BASE_URL_PLANET_ONE)
    deepStrictEqual(result, exptected)
  }

  {
    const exptected = {
      name: mocks.planetTwo.name,
      surfaceWater: mocks.planetTwo.surface_water,
      appearedIn: mocks.planetTwo.films.length
    }
    const result = await service.getPlanets(BASE_URL_PLANET_TWO)
    deepStrictEqual(result, exptected)
  }
})()
