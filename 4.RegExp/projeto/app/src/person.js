const { evaluateRegex } = require('./utils')

module.exports = class Person {
  constructor({ name, nationality, civilStatus, document, address }) {
    this.name = name
    this.nationality = nationality
    this.civilStatus = civilStatus
    this.document = document
    this.address = address
  }

  static _formatDocument(document) {
    const [name, value] = document.split(' ')
    return { [name.trim().toLowerCase()]: this._removeNonNumbers(value) }
  }

  static _removeNonNumbers(value) {
    const matchSpecialCharacters = evaluateRegex(/\D/g)
    return value.replace(matchSpecialCharacters, '')
  }

  static _formatAddress({ street, number, neighborhood, city }) {
    // começa a procurar depois do " a " e pega tudo que tem a frente
    // ?<= faz com que ignore tudo que tiver antes desse match
    // conhecido como positive lookBehind
    const streetMatch = evaluateRegex(/(?<=\sa\s).*$/g)
    const streetFormatted = street.match(streetMatch, '').join('')

    const neighborhoodMatch = evaluateRegex(/(?<=\s).*$/)
    const neighborhoodFormatted = neighborhood.match(neighborhoodMatch).join()

    const dotMatch = evaluateRegex(/\.$/)
    const cityFormatted = city.replace(dotMatch, '')
    return {
      street: streetFormatted,
      number,
      neighborhood: neighborhoodFormatted,
      city: cityFormatted,
    }
  }
  static fromList([
    name,
    nationality,
    civilStatus,
    document,
    street,
    number,
    neighborhood,
    city,
  ]) {
    // ^ -> inicio da string
    // + -> uma ou mais ocorrências
    // (\w{1}) -> pega só a primeira letra e deixa em um grupo
    // (a-zA-Z) -> encontra letras maiusculas ou minuscula, adicionamos o + pra ele pegar todas até o caracter especial
    // g -> todas ocorrências
    const fistLetterExp = evaluateRegex(/^(\w{1})([a-zA-Z]+$)/g)
    function formatFirstLetter(string) {
      return string.replace(
        fistLetterExp,
        (fullMatch, groupOne, groupTwo, index) =>
          `${groupOne.toUpperCase()}${groupTwo.toLowerCase()}`
      )
    }
    return new Person({
      name,
      nationality: formatFirstLetter(nationality),
      civilStatus: formatFirstLetter(civilStatus),
      document: this._formatDocument(document),
      address: this._formatAddress({
        street,
        number,
        neighborhood,
        city,
      }),
    })
  }
}
