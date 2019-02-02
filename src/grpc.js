import config from './config'
import App from './presentation/grpc/index'

const server = App(config)

export default server
