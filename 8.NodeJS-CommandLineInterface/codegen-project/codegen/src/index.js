#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { createLayersIfNotExists } from './createLayers.js'
import { createFiles } from './createFiles.js'

const {
  argv: { componentName },
} = yargs(hideBin(process.argv))
  .command('skeleton', 'create project skeleton', builder => {
    return builder
      .option('component-name', {
        alias: 'c',
        demandOption: true,
        description: `Component's name`,
        type: 'array',
      })
      .example(
        'skeleton --component-name product',
        'create a project with a single domain'
      )
      .example(
        'skeleton -c product -c person -c order',
        'create a project with multiple domains'
      )
  })
  .epilog(
    `Copyright (c) ${new Date().getFullYear()} - Codegen - Guilherme Teixeira Ais - All rights reserved.`
  )

const env = process.env.NODE_ENV || 'development'
const defaultMainFolder = env === 'development' ? 'demo' : 'src'

const allowedLayers = ['repository', 'service', 'factory'].sort()
const config = {
  layers: allowedLayers,
  defaultMainFolder,
  mainPath: '.',
}

await createLayersIfNotExists(config)

const pendingLayers = []

for (const component of componentName) {
  const result = createFiles({
    ...config,
    componentName: component,
  })

  pendingLayers.push(result)
}

await Promise.all(pendingLayers)
