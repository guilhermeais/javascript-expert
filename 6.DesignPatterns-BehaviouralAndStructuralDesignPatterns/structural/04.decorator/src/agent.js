import http from 'http'

async function injectHttpInterceptor() {
  const oldEmit = http.Server.prototype.emit
   http.Server.prototype.emit = function(...args) {
    const [event, request, response] = args
    if (event === 'request') {
      response.setHeader('X-Instrumented-By', 'Guilherme Teixeira')
    }
    
    return oldEmit.apply(this, args)
   }
}

export { injectHttpInterceptor }