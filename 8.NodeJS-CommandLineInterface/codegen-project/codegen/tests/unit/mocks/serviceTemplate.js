export default `
export default class ProductService {
  constructor({ repository }) {
    this.productRepository = repository
  }

  async create(data) {
    return this.productRepository.create(data)
  }

  async read(query) {
    return this.productRepository.read(query)
  }

  async update(id, data) {
    return this.productRepository.update(id, data)
  }

  async delete(id) {
    return this.productRepository.delete(id)
  }
}`