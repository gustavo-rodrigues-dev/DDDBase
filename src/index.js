import config from './config/config'
import App from './infrastructure/http/middlewares/server/index'

const server = App(config)

export default server
