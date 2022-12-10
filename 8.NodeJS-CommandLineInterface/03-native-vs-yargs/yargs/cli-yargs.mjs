#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const { argv } = yargs(hideBin(process.argv)).command(
  'createHero',
  'create a hero',
  builder => {
    return builder
      .option('name', {
        alias: 'n',
        demand: true,
        describe: 'hero name',
        type: 'string',
      })
      .option('age', {
        alias: 'a',
        demand: true,
        describe: 'hero age',
        type: 'number',
      })
      .option('power', {
        alias: 'p',
        demand: true,
        describe: 'hero power',
        type: 'string',
      })
      .example('createHero --name Flash --age 25 --power Speed', 'create a hero with name Flash, age 25 and power Speed')
      .example('createHero -n Flash -a 25 -p Speed', 'create a hero with name Flash, age 25 and power Speed')
  }
).epilog('Copyrigth 2021 - All rights reserved')
const makeHero = ({ name, age, power }) => ({
  name,
  age,
  power,
  id: Date.now(),
})

console.log(makeHero(argv))
