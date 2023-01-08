import Util from '../util.js'

const componentNameAnchor = '{{componentName}}'
const currentContextAchor = '{{currentContext}}'
const template = `
export default class {{componentName}}Service {
  constructor({ repository }) {
    {{currentContext}} = repository
  }

  async create(data) {
    return {{currentContext}}.create(data)
  }

  async read(query) {
    return {{currentContext}}.read(query)
  }

  async update(id, data) {
    return {{currentContext}}.update(id, data)
  }

  async delete(id) {
    return {{currentContext}}.delete(id)
  }
}`

export function serviceTemplate({ componentName, repositoryName } = {}) {
  const currentContext = `this.${Util.lowerCaseFirstLetter(repositoryName)}`
  const textFile = template
  .replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName))
  .replaceAll(currentContextAchor, currentContext)
  return {
    fileName: `${Util.lowerCaseFirstLetter(componentName)}Service`,
    template: textFile
  }
}
