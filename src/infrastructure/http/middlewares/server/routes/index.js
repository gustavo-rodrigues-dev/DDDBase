import SayHello from '../../../../../domain/hello/controller/sayHello'

export default (app) => {
  app.get('/', SayHello.hello)
}
