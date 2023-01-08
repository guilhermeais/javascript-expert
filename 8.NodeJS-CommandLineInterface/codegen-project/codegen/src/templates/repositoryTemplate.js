import Util from '../util.js'

const componentNameAnchor = '{{componentName}}'
const template = `
export default class {{componentName}}Repository {
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

export function repositoryTemplate({ componentName } = {}) {
  return {
    fileName: `${Util.lowerCaseFirstLetter(componentName)}Repository`,
    template: template.replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName)),
  }
}
