import Util from '../util.js'

const serviceNameAnchor = '{{serviceName}}'
const repositoryNameAnchor = '{{repositoryName}}'

const serviceNameDepAnchor = '{{serviceDepName}}'
const repositoryNameDepAnchor = '{{repositoryDepName}}'

const componentNameAnchor = '{{componentName}}'

const template = `
import ${serviceNameAnchor} from '../service/${serviceNameDepAnchor}.js'
import ${repositoryNameAnchor} from '../repository/${repositoryNameDepAnchor}.js'

export default class ${componentNameAnchor}Factory {
  static getInstance() {
    const repository = new ${repositoryNameAnchor}()
    const service = new ${serviceNameAnchor}({ repository })

    return service
  }
}
`

export function factoryTemplate({ componentName, repositoryName, serviceName } = {}) {
  const textFile = template
  .replaceAll(serviceNameDepAnchor, Util.lowerCaseFirstLetter(serviceName))
  .replaceAll(repositoryNameDepAnchor, Util.lowerCaseFirstLetter(repositoryName))

  .replaceAll(serviceNameAnchor, Util.upperCaseFirstLetter(serviceName))
  .replaceAll(repositoryNameAnchor, Util.upperCaseFirstLetter(repositoryName))

  .replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName))
  return {
    fileName: `${Util.lowerCaseFirstLetter(componentName)}Factory`,
    template: textFile
  }
}
