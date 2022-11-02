import RickAndMortyUSA from '../integrations/RickAndMortyUSA'

export default class RickAndMortyUSAAdapter {
  static async getCharacters() {
    return RickAndMortyUSA.getCharactersFromXML()
  }
}