module.exports = class UserService {
  constructor({ userRepository }) {
    this.userRepository = userRepository
  }

  async find(query) {
    const users = await this.userRepository.find(query)

    return users.map(user => ({
      ...user,
      name: user.name.toUpperCase(),
    }))
  }
}
