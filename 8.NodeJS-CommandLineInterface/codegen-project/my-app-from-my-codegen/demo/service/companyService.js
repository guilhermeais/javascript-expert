
export default class CompanyService {
  constructor({ repository }) {
    this.companyRepository = repository
  }

  async create(data) {
    return this.companyRepository.create(data)
  }

  async read(query) {
    return this.companyRepository.read(query)
  }

  async update(id, data) {
    return this.companyRepository.update(id, data)
  }

  async delete(id) {
    return this.companyRepository.delete(id)
  }
}