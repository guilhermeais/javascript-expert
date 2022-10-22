const UserRepository = require('../repository/UserRepository')
const UserService = require('../service/UserService')
const Database = require('../util/database')

module.exports = class UserFactory {
  static async createUserServiceInstance() {
    const db = new Database({connectionString: 'someConnectionString'})
    const dbConnection = await db.connect()
    const userRepository = new UserRepository({dbConnection})
    const userService = new UserService({userRepository})

    return userService
  }
}