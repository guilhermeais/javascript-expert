const http = require('http')
const DEFAULT_PORT = process.env.PORT || 3000

module.exports = class App {
  constructor(routes) {
    this.routes = routes
    this.server = null

    this.handle = this.handle.bind(this)
  }
  async handle(req, res) {
    const { url, method } = req
    const routeKey = `${method.toLowerCase()}:${url}`
    const chosenRoute = this.routes[routeKey] || this.routes.default
    res.writeHead(200, { 'Content-Type': 'text/html' })
    return chosenRoute.apply(this.routes, [req, res])
  }

  async init(port = DEFAULT_PORT) {
    this.server = http.createServer(this.handle.bind(this))
    return new Promise((resolve, reject) => {
      this.server.listen(port, () => resolve(port))
    })
  }

  async close() {
    if (this.server) {
     return new Promise((resolve, reject) => {
      this.server.close((err) => {
        if(err) {
          reject(err)
        }

        resolve()
      })
     })
    }
  }
}