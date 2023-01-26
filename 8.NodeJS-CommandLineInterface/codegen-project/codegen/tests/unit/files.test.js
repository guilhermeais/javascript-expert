import { 
  expect, 
  describe,
  test,
  jest,
  beforeEach
} from '@jest/globals';

import fsPromises from 'fs/promises';
import { createFiles } from '../../src/createFiles';
import templates from '../../src/templates/index.js';

describe('#Layers - Files Structure', () => {
  const defaultLayers = [
    'serviceTemplate',
    'factoryTemplate',
    'repositoryTemplate',
  ]

  let config = {
    mainPath: './',
    defaultMainFolder: 'src',
    layers: defaultLayers,
    componentName: 'heroes',
  }
  const repositoryLayer = `${config.componentName}Repository`
  const serviceLayer = `${config.componentName}Service`

  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()

    config = {
      mainPath: './',
      defaultMainFolder: 'src',
      layers: defaultLayers,
      componentName: 'heroes',
    }
  })


  test('should not create file structure on inexisting templates', async () => {
    const specificConfig = {
      ...config,
      layers: ['inexisting'],
    }

    const expected =  {
      error: 'the chosen layer doesn\'t have a template'
    }

    const result = await createFiles(specificConfig);
    expect(result).toEqual(expected);
  });

  test('repository should not add any additional dependencies', async () => {
    jest.spyOn(fsPromises, 'writeFile').mockResolvedValue()
    jest.spyOn(templates, templates.repositoryTemplate.name).mockReturnValue({
      className: '', template: ''
    })

    const specificConfig = {
      ...config,
      layers: ['repositoryTemplate'],
    }

    const expected =  {
      success: true
    }

    const result = await createFiles(specificConfig);
    expect(result).toEqual(expected);

    expect(fsPromises.writeFile).toHaveBeenCalledTimes(specificConfig.layers.length);
    expect(templates.repositoryTemplate).toHaveBeenCalledWith({
      componentName: specificConfig.componentName,
    });
  });

  test('service should have repository as dependency', async () => {
    jest.spyOn(fsPromises, 'writeFile').mockResolvedValue()
    jest.spyOn(templates, templates.repositoryTemplate.name).mockReturnValue({
      className: '', template: ''
    })

    jest.spyOn(templates, templates.serviceTemplate.name).mockReturnValue({
      className: '', template: ''
    })

    const specificConfig = {
      ...config,
      layers: ['repositoryTemplate', 'serviceTemplate'],
    }

    const expected =  {
      success: true
    }

    const result = await createFiles(specificConfig);
    expect(result).toEqual(expected);

    expect(fsPromises.writeFile).toHaveBeenCalledTimes(specificConfig.layers.length);
    expect(templates.serviceTemplate).toHaveBeenCalledWith({
      componentName: specificConfig.componentName,
      repositoryName: repositoryLayer,
    });
  });

  test('factory should have repository and service as dependency', async () => {
    jest.spyOn(fsPromises, 'writeFile').mockResolvedValue()
    jest.spyOn(templates, templates.repositoryTemplate.name).mockReturnValue({
      className: '', template: ''
    })

    jest.spyOn(templates, templates.serviceTemplate.name).mockReturnValue({
      className: '', template: ''
    })

    jest.spyOn(templates, templates.factoryTemplate.name).mockReturnValue({
      className: '', template: ''
    })


    const expected =  {
      success: true
    }

    const result = await createFiles(config);
    expect(result).toEqual(expected);

    expect(fsPromises.writeFile).toHaveBeenCalledTimes(config.layers.length);
    expect(templates.factoryTemplate).toHaveBeenCalledWith({
      componentName: config.componentName,
      repositoryName: repositoryLayer,
      serviceName: serviceLayer,
    });
  });
});