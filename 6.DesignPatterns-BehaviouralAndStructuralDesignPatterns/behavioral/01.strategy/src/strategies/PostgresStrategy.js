import knex from 'knex'

export default class PostgresStrategy {
  #instance
  constructor(connectionString) {
    this.connectionString = connectionString
    this.table = 'warriors'
  }

  async connect() {
    this.#instance = knex({
      client: 'pg',
      connection: this.connectionString,
    })

    return this.#instance.raw('select 1+1 as result')
  }

  async create(data) {
    return this.#instance.insert(data).into(this.table)
  }

  async read(query = {}) {
    return this.#instance.select().from(this.table).where(query)
  }
}
