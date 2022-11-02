import RickAndMortyBRL from '../integrations/RickAndMortyBRL'

export default class RickAndMortyBRLAdapter {
  static async getCharacters() {
    return RickAndMortyBRL.getCharactersFromJSON()
  }
}