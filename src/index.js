import config from './config/config'
import App from './presentation/http/server/index'

const server = App(config)

export default server
