const rewiremock = require('rewiremock/node')
const { deepStrictEqual } = require('assert')

// Poderia estar em outro arquivo
const dbData = [
  {
    id: 1,
    name: 'John Doe',
  },
  {
    id: 2,
    name: 'John Lennon',
  },
]

class DatabaseStub {
  connect = () => this
  find = () => dbData
}
rewiremock(() => require('./../src/util/database')).with(DatabaseStub)
;(async () => {
  {
    const expected = dbData.map(({ name, ...user }) => ({ name: name.toUpperCase(), ...user }))
    rewiremock.enable()
    const UserFactory = require('../src/factory/UserFactory')

    const userFactory = await UserFactory.createUserServiceInstance()
    const result = await userFactory.find()
    deepStrictEqual(result, expected)
    rewiremock.disable()
  }

})()
