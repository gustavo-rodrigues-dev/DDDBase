import config from './config/config'
import App from './presentation/grpc/index'

const server = App(config)

export default server
