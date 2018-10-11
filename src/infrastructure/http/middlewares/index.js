import Server from './server/'
import InterfaceMiddleware from './interfaceMiddleware'

class App extends InterfaceMiddleware {
  constructor (config) {
    super()
    if (config.middleware === 'server') {
      this.middleware = new Server(config)
    }
  }
  start () {
    this.middleware.start()
  }
}

export default App
