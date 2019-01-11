import { health } from '../../../../domain/health/controller'
import { addBlacklist, checkBlacklist, removeBlacklist } from '../../../../domain/blacklist/controllers/index'

export default app => {
  app.get('/status', (req, res) => health.uptime(req, res))
  app
    .route('/blackList')
    .get((req, res) => checkBlacklist.verify(req.query, res))
    .post((req, res) => addBlacklist.add(req.body, res))
    .delete((req, res) => removeBlacklist.removeBlacklist(req.body, res))
  app
    .route('/blackList/:cpf')
    .get((req, res) => checkBlacklist.verify(req.params, res))
    .delete((req, res) => removeBlacklist.delete(req.params, res))
}
