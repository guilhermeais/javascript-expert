import {
  expect,
  describe,
  test,
  jest,
  beforeEach,
  afterEach,
  beforeAll,
} from '@jest/globals'
import { tmpdir } from 'os'
import fsPromises from 'fs/promises'
import { join } from 'path'
import { createLayersIfNotExists } from '../../src/createLayers'
import { createFiles } from '../../src/createFiles'
import Util from '../../src/util'

describe('#Integration - Files - Files Structure', () => {
  const config = {
    mainPath: './',
    defaultMainFolder: 'src',
    layers: ['service', 'factory', 'repository'].sort(),
    componentName: 'heroes',
  }

  function getFilePathFromLayer({
    mainPath,
    defaultMainFolder,
    layer,
    componentName,
  }) {
    return join(
      mainPath,
      defaultMainFolder,
      layer,
      `${componentName}${Util.upperCaseFirstLetter(layer)}.js`
    )
  }

  const packageJSONFileName = 'package.json'
  // Sem caminho relativo, logo, consideramos que o arquivo está na raiz do projeto (onde está o package.json real)
  const packageJSONPath = join('./tests/integration/mocks', packageJSONFileName)

  beforeEach(async () => {
    config.mainPath = await fsPromises.mkdtemp(`${join(tmpdir(), 'layers-')}`)
    await fsPromises.copyFile(
      packageJSONPath,
      join(config.mainPath, packageJSONFileName)
    )

    await createLayersIfNotExists(config)
  })

  afterEach(async () => {
    await fsPromises.rm(config.mainPath, { recursive: true })
  })

  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  describe('Repository Class', () => {
    async function expectNotImplemented(fn) {
      const error = new Error('method not implemented')

      return expect(fn.call()).rejects.toThrow(error)
    }

    test('should have create method', async () => {
      const specificConfig = {
        ...config,
        layers: ['repository'],
      }

      await createFiles(specificConfig)

      const repositoryFilePath = getFilePathFromLayer({
        ...specificConfig,
        layer: 'repository',
      })

      const { default: RepositoryClass } = await import(repositoryFilePath)
      const instance = new RepositoryClass()

      await expectNotImplemented(instance.create)
    })

    test('should have read method', async () => {
      const specificConfig = {
        ...config,
        layers: ['repository'],
      }

      await createFiles(specificConfig)

      const repositoryFilePath = getFilePathFromLayer({
        ...specificConfig,
        layer: 'repository',
      })

      const { default: RepositoryClass } = await import(repositoryFilePath)
      const instance = new RepositoryClass()

      await expectNotImplemented(instance.read)
    })

    test('should have update method', async () => {
      const specificConfig = {
        ...config,
        layers: ['repository'],
      }

      await createFiles(specificConfig)

      const repositoryFilePath = getFilePathFromLayer({
        ...specificConfig,
        layer: 'repository',
      })

      const { default: RepositoryClass } = await import(repositoryFilePath)
      const instance = new RepositoryClass()

      await expectNotImplemented(instance.update)
    })

    test('should have delete method', async () => {
      const specificConfig = {
        ...config,
        layers: ['repository'],
      }

      await createFiles(specificConfig)

      const repositoryFilePath = getFilePathFromLayer({
        ...specificConfig,
        layer: 'repository',
      })

      const { default: RepositoryClass } = await import(repositoryFilePath)
      const instance = new RepositoryClass()

      await expectNotImplemented(instance.delete)
    })
  })

  describe('Service class', () => {
    test('should have create method and call repository.create with correct params', async () => {
      const specificConfig = {
        ...config,
        layers: ['repository', 'service'],
      }

      await createFiles(specificConfig)

      const repositoryFilePath = getFilePathFromLayer({
        ...specificConfig,
        layer: 'repository',
      })

      const serviceFilePath = getFilePathFromLayer({
        ...specificConfig,
        layer: 'service',
      })

      const { default: RepositoryClass } = await import(repositoryFilePath)
      const { default: ServiceClass } = await import(serviceFilePath)

      const repositoryInstance = new RepositoryClass()

      jest.spyOn(repositoryInstance, 'create').mockResolvedValue()

      const serviceInstance = new ServiceClass({repository: repositoryInstance})

      const data = { name: 'Flash' }
    
      await serviceInstance.create(data)

      expect(repositoryInstance.create).toHaveBeenCalledWith(data)
    })

    test('should have read method and call repository with correct params', async () => {
      const specificConfig = {
        ...config,
        layers: ['repository', 'service'],
      }

      await createFiles(specificConfig)

      const repositoryFilePath = getFilePathFromLayer({
        ...specificConfig,
        layer: 'repository',
      })

      const serviceFilePath = getFilePathFromLayer({
        ...specificConfig,
        layer: 'service',
      })

      const { default: RepositoryClass } = await import(repositoryFilePath)
      const { default: ServiceClass } = await import(serviceFilePath)

      const repositoryInstance = new RepositoryClass()

      jest.spyOn(repositoryInstance, 'read').mockResolvedValue()

      const serviceInstance = new ServiceClass({repository: repositoryInstance})

      const data = { name: 'Flash' }
    
      await serviceInstance.read(data)

      expect(repositoryInstance.read).toHaveBeenCalledWith(data)
    })

    test('should have update method and call repository with correct params', async () => {
      const specificConfig = {
        ...config,
        layers: ['repository', 'service'],
      }

      await createFiles(specificConfig)

      const repositoryFilePath = getFilePathFromLayer({
        ...specificConfig,
        layer: 'repository',
      })

      const serviceFilePath = getFilePathFromLayer({
        ...specificConfig,
        layer: 'service',
      })

      const { default: RepositoryClass } = await import(repositoryFilePath)
      const { default: ServiceClass } = await import(serviceFilePath)

      const repositoryInstance = new RepositoryClass()

      jest.spyOn(repositoryInstance, 'update').mockResolvedValue()

      const serviceInstance = new ServiceClass({repository: repositoryInstance})

      const id = 1
      const data = { name: 'Flash' }
    
      await serviceInstance.update(id, data)

      expect(repositoryInstance.update).toHaveBeenCalledWith(id, data)
    })

    test('should have delete method and call repository with correct params', async () => {
      const specificConfig = {
        ...config,
        layers: ['repository', 'service'],
      }

      await createFiles(specificConfig)

      const repositoryFilePath = getFilePathFromLayer({
        ...specificConfig,
        layer: 'repository',
      })

      const serviceFilePath = getFilePathFromLayer({
        ...specificConfig,
        layer: 'service',
      })

      const { default: RepositoryClass } = await import(repositoryFilePath)
      const { default: ServiceClass } = await import(serviceFilePath)

      const repositoryInstance = new RepositoryClass()

      jest.spyOn(repositoryInstance, 'delete').mockResolvedValue()

      const serviceInstance = new ServiceClass({repository: repositoryInstance})

      const id = 1
    
      await serviceInstance.delete(id)

      expect(repositoryInstance.delete).toHaveBeenCalledWith(id)
    })
  })

  describe('Factory class', () => {
    test('should instantiate service with correct params', async () => {
      const specificConfig = {
        ...config,
      }

      await createFiles(specificConfig)

      const repositoryFilePath = getFilePathFromLayer({
        ...specificConfig,
        layer: 'repository',
      })

      const serviceFilePath = getFilePathFromLayer({
        ...specificConfig,
        layer: 'service',
      })

      const factoryFilePath = getFilePathFromLayer({
        ...specificConfig,
        layer: 'factory',
      })

      const { default: RepositoryClass } = await import(repositoryFilePath)
      const { default: ServiceClass } = await import(serviceFilePath) 
      const { default: FactoryClass } = await import(factoryFilePath)

      const expected = new ServiceClass({repository: new RepositoryClass()})
      const instance = FactoryClass.getInstance()

      expect(instance).toEqual(expected)
      expect(instance).toBeInstanceOf(ServiceClass)
    })
  })
})
