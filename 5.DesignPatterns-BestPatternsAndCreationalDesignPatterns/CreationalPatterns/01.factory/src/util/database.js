module.exports = class Database {
  constructor({ connectionString } = {}) {
    this.connectionString = connectionString
  }

  async connect() {
    await this.#sleep(100)
    return this
  }

  async #sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async find(query) {
    await this.#sleep(100)
    return [
      {
        id: 1,
        name: 'John Doe',
      }
    ]
  }
}
