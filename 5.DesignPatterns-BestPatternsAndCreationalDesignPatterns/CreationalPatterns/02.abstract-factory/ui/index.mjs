import { database } from '../shared/data.mjs'

class Application {
  constructor(factory) {
    this.table = factory.createTable()
  }

  initialize(database) {
    this.table.render(database)
  }
}

;(async function main() {
  const platformPath = globalThis.window ? 'browser' : 'console'
  const { default: ViewFactory } = await import(`./../platforms/${platformPath}/index.mjs`)
  const viewFactory = new ViewFactory()
  
  const app = new Application(viewFactory)
  app.initialize(database)
})()