import { 
  expect, 
  describe,
  test,
  jest,
  beforeEach
} from '@jest/globals';
import { createLayersIfNotExists } from '../../src/createLayers.js';
import Util from '../../src/util';
import fsPromises from 'fs/promises';
import fs from 'fs';


describe('#Layers - Folder Structure', () => {
  const defaultLayers = [
    'service',
    'factory',
    'repository',
  ]
  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })


  test('should create folders if doesnt exists', async () => {
    jest.spyOn(fsPromises, 'mkdir').mockResolvedValue()
    jest.spyOn(fs, 'existsSync').mockReturnValue(false)

    await createLayersIfNotExists({ mainPath: '', layers: defaultLayers, defaultMainFolder: 'src'})

    expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length)
    expect(fsPromises.mkdir).toHaveBeenCalledTimes(defaultLayers.length)
  });

  test('should not create folders if it exists', async () => {
    jest.spyOn(fsPromises, 'mkdir').mockResolvedValue()
    jest.spyOn(fs, 'existsSync').mockReturnValue(true)

    await createLayersIfNotExists({ mainPath: '', layers: defaultLayers, defaultMainFolder: 'src'})

    expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length)
    expect(fsPromises.mkdir).not.toHaveBeenCalledTimes(defaultLayers.length)
  });
});