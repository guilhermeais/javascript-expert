'use strict'
const { watch, promises: {readFile} } = require('fs')

class File {
  watch(event, filename) {
    console.log('this', this);
    console.log('arguments', arguments);
    this.showContent(filename)
  }

  async showContent(filename) {
    console.log((await readFile(filename, 'utf8')).toString())
  }
}

const file = new File()
// dessa forma, ele ignora o 'this' da classe File
//  herda o this da função watch  :0
// watch(__filename, file.watch)

// alternativas para não herdar o this da função watch
// 1 - arrow function (feio)
// watch(__filename, (event, filename) => file.watch(event, filename))

// 2 - bind, deixando explicito qual é o contexto que a função vai usar.
// Ele basicamente cria uma nova função com o contexto que você passou, no caso
//  passamos o proprio file como contexto
// watch(__filename, file.watch.bind(file))

// 3 - call, passando o contexto como primeiro parâmetro e os outros parâmetros depois
// veja que passamos no segundo parâmetro o ...args, que é basicamente um array com todos
//  os parâmetros que a função recebeu (no caso, que a watch passa para o file.watch)) 
// watch(__filename, (...args) => file.watch.call(file, ...args))

// 4 - apply, passando o contexto como primeiro parâmetro e os outros parâmetros como um array
//  no segundo parâmetro. 
watch(__filename, (...args) => file.watch.apply(file, args))