import http from 'http'
function handleRequest(request, response) {
  return response.end('Hello World')
}

export const server = http.createServer(handleRequest)