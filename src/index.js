import config from './config/config'
import App from './infrastructure/http/middlewares/server/index'

const service = new App(config)
service.start()

export default service
