import { injectHttpInterceptor } from './src/agent.js';
injectHttpInterceptor()
import { server } from './example/http-server.js';
server.listen(3000, () => {
  console.log('Server listening on port 3000');
});