const http = require('http')

const DEFAULT_USER = {
  username: 'guilherme',
  password: 'some_password'
}

const routes = {
  default: async (req, res) => {
    res.write('Hello World')
    return res.end()
  },
  'get:/contact': async (req, res) => {
    res.write('Contact us page')
    return res.end()
  },
  'post:/login': async (req, res) => {
    // response é um iterator!
    for await (const data of req) {
      const user = JSON.parse(data)

      if(user.username !== DEFAULT_USER.username || user.password !== DEFAULT_USER.password) {
        res.writeHead(401)
        res.write('Login has failed!')
        return res.end()
      }
    }
    res.write('Login has succeeded!')
    return res.end()
  },
}

function handler(req, res) {
  const { url, method } = req
  
  const routeKey = `${method.toLowerCase()}:${url}`
  const chosenRoute = routes[routeKey] || routes.default
  res.writeHead(200, { 'Content-Type': 'text/html' })
  return chosenRoute(req, res)
}

const app = http
  .createServer(handler)
  .listen(3004, () => console.log('Server running on port 3004'))

module.exports = app
