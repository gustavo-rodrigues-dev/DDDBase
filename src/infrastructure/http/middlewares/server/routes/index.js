import Health from '../../../../../domain/health/controller/health'

export default (app) => {
  app.get('/', Health.uptime)
}
