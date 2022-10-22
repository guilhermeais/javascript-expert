module.exports = class UserRepository {
  
  constructor({
    dbConnection
  }) {
    this.dbConnection = dbConnection;
  }

  save(user) {
    this.users.push(user);
  }

  async find(query) {
    return this.dbConnection.find(query);
  }
}