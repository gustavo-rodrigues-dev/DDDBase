import Health from '../../../../../domain/health/controller/health'

export default app => {
  app.get('/status', (req, res) => Health.uptime(req, res))
}
