import fsPromises from 'fs/promises'
import templates from './templates/index.js'
import Util from './util.js'

function getDependenciesByLayer({ layer, componentName } = {}) {
  const safeComponentName = Util.lowerCaseFirstLetter(componentName)
  const dependencies = {
    serviceTemplate: {
      repositoryName: `${safeComponentName}Repository`,
    },
    factoryTemplate: {
      repositoryName: `${safeComponentName}Repository`,
      serviceName: `${safeComponentName}Service`,
    },
  }

  return dependencies[layer] || {}
}

export async function createFiles({
  mainPath,
  defaultMainFolder,
  layers = [],
  componentName,
} = {}) {
  const templatesNames = Object.keys(templates)
  const pendingFilesToWrite = []
  for (const layer of layers) {
    const chosenTemplate = templatesNames.find(template => template === layer)

    if (!chosenTemplate) {
      return {
        error: "the chosen layer doesn't have a template",
      }
    }

    const template = templates[chosenTemplate]
    const targetFolder = `${mainPath}/${defaultMainFolder}/${layer}`
    const dependencies = getDependenciesByLayer({ layer, componentName })

    const { fileName, template: templateAsFile } = template({
      componentName,
      ...dependencies,
    })

    const filePath = `${targetFolder}/${Util.lowerCaseFirstLetter(fileName)}.js`
    pendingFilesToWrite.push({
      filePath,
      file: templateAsFile,
    })
  }

  await writePendingFiles(pendingFilesToWrite)

  return {
    success: true,
  }
}

async function writePendingFiles(pendingFiles) {
  return Promise.all(
    pendingFiles.map(async ({ filePath, file }) =>
      fsPromises.writeFile(filePath, file)
    )
  )
}
