import Health from '../../../../../domain/health/controller/health'
import BlacklistController from '../../../../../domain/blacklist/controllers/index'

export default app => {
  app.get('/status', (req, res) => Health.uptime(req, res))
  app
    .route('/blackList')
    .get((req, res) => BlacklistController.checkBlacklist(req.query, res))
    .post((req, res) => BlacklistController.addBlacklist(req.body, res))
    .delete((req, res) => BlacklistController.removeBlacklist(req.body, res))
  app
    .route('/blackList/:cpf')
    .get((req, res) => BlacklistController.checkBlacklist(req.params, res))
    .delete((req, res) => BlacklistController.removeBlacklist(req.params, res))
}
