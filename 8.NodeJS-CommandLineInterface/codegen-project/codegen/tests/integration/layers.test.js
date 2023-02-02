import {
  expect,
  describe,
  test,
  jest,
  beforeEach,
  afterEach,
} from '@jest/globals'
import { tmpdir } from 'os'
import fsPromises from 'fs/promises'
import { join } from 'path'
import { createLayersIfNotExists } from '../../src/createLayers'

describe('#Integration - Layers - Files Structure', () => {
  const config = {
    mainPath: './',
    defaultMainFolder: 'src',
    layers: ['service', 'factory', 'repository'].sort(),
  }

  async function getFolders(config) {
    return fsPromises.readdir(join(config.mainPath, config.defaultMainFolder))
  }

  beforeEach(async () => {
    config.mainPath = await fsPromises.mkdtemp(`${join(tmpdir(), 'skeleton-')}`)
  })

  afterEach(async () => {
    await fsPromises.rm(config.mainPath, { recursive: true })
  })

  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  test('should create folders if it doesnt exists', async () => {
    const beforeRun = await fsPromises.readdir(config.mainPath)

    await createLayersIfNotExists({
      ...config,
    })

    const afterRun = await getFolders(config)

    expect(beforeRun).toEqual([])
    expect(beforeRun).not.toStrictEqual(afterRun)
    expect(afterRun).toEqual(config.layers)
  })

  test('should not create folders if it exists', async () => {
    await createLayersIfNotExists({ ...config })

    const beforeRun = await getFolders(config)

    await createLayersIfNotExists({ ...config })

    const afterRun = await getFolders(config)

    expect(afterRun).toEqual(beforeRun)
  })
})
