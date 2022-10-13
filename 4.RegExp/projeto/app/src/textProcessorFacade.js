const TextProcessorFluentAPI = require('./textProcessorFluentAPI')

module.exports = class TextProcessorFacade {
  #textProcessorFluentApi
  constructor(text) {
    this.#textProcessorFluentApi = new TextProcessorFluentAPI(text)
  }

  getPeopleFromPDF() {
    return this.#textProcessorFluentApi
      .extractPeopleData()
      .divideTextInColumns()
      .removeEmptyCharacters()
      .mapPerson()
      .build()
  }
}