export default class ContextStrategy {
  constructor(dbStrategy) {
    this.dbStrategy = dbStrategy
  }

  async connect() {
    return this.dbStrategy.connect()
  }

  async create(data) {
    return this.dbStrategy.create(data)
  }

  async read(query) {
    return this.dbStrategy.read(query)
  }
}