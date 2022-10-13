// O Objetivo do Fluent API é executar as tarefas como uma pipeline,
// e no fim, chama o build, bem parecido com o padrão Builder.

const Person = require('./person')
const { evaluateRegex } = require('./utils')

module.exports = class TextProcessorFluentAPI {
  #content = ''
  constructor(content) {
    this.#content = content
  }

  extractPeopleData() {
    // ?<= Pega todo o texto que vira depois do resultado do grupo
    // [contratante|contratada] pega um ou o outro, (e tem a flag no fim da expressão pra fazer case insensitive)
    // :\s{1} vai procurar somente o caracter ":" seguido de 1 "espaço" após ele
    // tudo acima fica dentro de um parênteses pra dizer que quero salvar o resultado desse grupo

    // (?!\s) negative look around, vai ignorar os contratantes do fim do documento que só tem espaço na frente deles
    // .*\n vai pegar todas as linhas seguintes (a quebra de linha separa o contratantes)
    // .*? non greety, esse ? faz com que ele pare na primeira recorrencia, assim ele evita ficar em loop

    // $ informar que a pesquisa acaba no fim da linha
    // g -> global para procurar todas as linhas
    // m -> multiline pra procurar quebra de linha
    // i -> case insensitive pros cabeçalhos serem procurados de duas maneiras (maiúscula e minúscula)

    const matchPerson = evaluateRegex(
      /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gim
    )
    // Vai retornar o resultado da RegEx em um array
    const onlyPerson = this.#content.match(matchPerson)
    this.#content = onlyPerson
    return this
  }

  divideTextInColumns() {
    const splitRegex = evaluateRegex(/,/g)
    this.#content = this.#content.map(content => content.split(splitRegex))
    return this
  }

  mapPerson() {
    this.#content = this.#content.map(person => Person.fromList(person))
    return this
  }

  removeEmptyCharacters() {
    const removeWhiteSpaceRegex = evaluateRegex(/^\s+|\s+$|\n/g)
    this.#content = this.#content.map(line => line.map(item => item.replace(removeWhiteSpaceRegex, '')))
    return this
  }

  build() {
    return this.#content
  }
}
