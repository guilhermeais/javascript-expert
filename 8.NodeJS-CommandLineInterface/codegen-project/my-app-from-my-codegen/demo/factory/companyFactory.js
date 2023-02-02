
import CompanyService from '../service/companyService.js'
import CompanyRepository from '../repository/companyRepository.js'

export default class CompanyFactory {
  static getInstance() {
    const repository = new CompanyRepository()
    const service = new CompanyService({ repository })

    return service
  }
}
