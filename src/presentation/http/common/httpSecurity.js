import Cors from 'cors'
import Helmet from 'helmet'

export default app => {
  app.use(Cors())
  app.use(Helmet())
}
