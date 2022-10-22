export default class NotImplementedException extends Error {
  constructor(method) {
    super(`the ${method} was not implemented`)
    this.name = 'NotImplementedException'
  }
}
