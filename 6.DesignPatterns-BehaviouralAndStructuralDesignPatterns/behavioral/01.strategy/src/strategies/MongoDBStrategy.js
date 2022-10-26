import MongoDB from 'mongodb'

export default class MongoDBStrategy {
  #instance
  constructor(connectionString) {
    const { pathname: dbName } = new URL(connectionString)
    this.connectionString = connectionString.replace(dbName, '')
    this.dbName = dbName.replace(/\W/, '')
    this.collection = 'warriors'
    this.isConnected = false
  }

  async connect() {
    const client = new MongoDB.MongoClient(this.connectionString, {
      useUnifiedTopology: true,
    })

    await client.connect()
   
    this.#instance = client.db(this.dbName).collection(this.collection)
    this.isConnected = true
    return this.#instance
  }

  async create(data) {
    if (!this.isConnected) {
      await this.connect()
    }
    return this.#instance.insertOne(data)
  }

  async read(query) {
    return this.#instance.find(query).toArray()
  }
}
