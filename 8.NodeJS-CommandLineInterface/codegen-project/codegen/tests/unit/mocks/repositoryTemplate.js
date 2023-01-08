export default `
export default class ProductRepository {
  constructor() {}

  create(data) {
    return Promise.reject(new Error('method not implemented'))
  }

  read(query) {
    return Promise.reject(new Error('method not implemented'))
  }

  update(id, data) {
    return Promise.reject(new Error('method not implemented'))
  }

  delete(id) {
    return Promise.reject(new Error('method not implemented'))
  }
}`