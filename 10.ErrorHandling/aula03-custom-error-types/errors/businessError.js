import BaseError from './baseError.js'

export default class BusinessError extends BaseError {
  constructor(errorMessage) {
    super({ name: BusinessError.name, message: errorMessage })
  }
}
