const Base = require('./base/base');

module.exports = class Customer extends Base {
  constructor({ id, name, age }) {
    super({ id, name });
    this.age = age;
  }
} 