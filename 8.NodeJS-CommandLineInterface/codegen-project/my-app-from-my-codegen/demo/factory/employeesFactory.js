
import EmployeesService from '../service/employeesService.js'
import EmployeesRepository from '../repository/employeesRepository.js'

export default class EmployeesFactory {
  static getInstance() {
    const repository = new EmployeesRepository()
    const service = new EmployeesService({ repository })

    return service
  }
}
