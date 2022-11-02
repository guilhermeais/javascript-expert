import { expect, describe, test, jest, beforeEach } from '@jest/globals'
import RickAndMortyBRL from '../../../src/business/integrations/RickAndMortyBRL';
import fs from 'fs/promises';
import Character from '../../../src/entities/character';
import axios from 'axios'

describe('RickAndMortyBRL', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  })
  describe('getCharactersFromJSON', () => {
    test('should return a list of Character Entity', async () => {
      const response = JSON.parse(await fs.readFile('./test/mocks/characters.json')) 
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: response })
      const expected = response.results.map(char => new Character(char))
      const result = await RickAndMortyBRL.getCharactersFromJSON()
      expect(result).toStrictEqual(expected)   
    });

    test('should return an empty list if the API returns nothing', async () => {
      const response = JSON.parse(await fs.readFile('./test/mocks/characters-empty.json')) 
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: response })
      const expected = []
      const result = await RickAndMortyBRL.getCharactersFromJSON()
      expect(result).toStrictEqual(expected)   
    });
  });
});