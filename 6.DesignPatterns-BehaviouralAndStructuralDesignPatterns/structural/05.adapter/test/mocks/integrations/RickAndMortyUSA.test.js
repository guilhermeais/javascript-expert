import { expect, describe, test, jest, beforeEach } from '@jest/globals'
import RickAndMortyUSA from '../../../src/business/integrations/RickAndMortyUSA'
import fs from 'fs/promises'
import Character from '../../../src/entities/character'
import axios from 'axios'
import { parseStringPromise } from 'xml2js'

describe('RickAndMortyUSA', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })
  describe('getCharactersFromXML', () => {
    test('should return a list of Character Entity', async () => {
      const response = await fs.readFile('./test/mocks/characters.xml')
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: response })
      const expected = [
        {
          gender: 'Male',
          id: 10,
          location: "Worldender's lair",
          name: 'Alan Rails',
          origin: 'unknown',
          species: 'Human',
          status: 'Dead',
          type: 'Superhuman (Ghost trains summoner)',
        },
      ]
      const result = await RickAndMortyUSA.getCharactersFromXML()
      expect(result).toMatchObject(expected)
    })

    test.skip('should return an empty list if the API returns nothing', async () => {
      const response = await fs.readFile('./test/mocks/characters-empty.xml')
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: response })
      const expected = []
      const result = await RickAndMortyUSA.getCharactersFromXML()
      expect(result).toMatchObject(expected)
    })
  })
})
