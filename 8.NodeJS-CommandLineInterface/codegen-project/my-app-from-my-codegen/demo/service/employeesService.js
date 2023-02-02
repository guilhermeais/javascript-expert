
export default class EmployeesService {
  constructor({ repository }) {
    this.employeesRepository = repository
  }

  async create(data) {
    return this.employeesRepository.create(data)
  }

  async read(query) {
    return this.employeesRepository.read(query)
  }

  async update(id, data) {
    return this.employeesRepository.update(id, data)
  }

  async delete(id) {
    return this.employeesRepository.delete(id)
  }
}