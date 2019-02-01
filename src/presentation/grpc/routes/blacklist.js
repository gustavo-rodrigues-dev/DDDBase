import Router from '../common/roter'
import { addBlacklist, checkBlacklist, removeBlacklist } from '../../../domain/blacklist/controllers/index'
import Output from '../../../lib/output'
import { Readable } from 'stream'
import { status } from 'grpc'
class BlacklistRouter extends Router {
  static addBlacklist (call) {
    const stream = new Readable({
      objectMode: true,
      read (size) {
        return true
      }
    })

    stream.pipe(call)
    const output = new Output()
    addBlacklist.add(call.request, output)
      .then(resp => {
        stream.push(resp)
        stream.push(null)
        stream.resume()
      })
      .catch(err => {
        this.logger.error('Error on addBlacklist', err)
        stream.unpipe(call).destroy()
        err.code = status.INTERNAL
        call.emit('error', err)
      })
  }
  static checkBlacklist (call) {
    const stream = new Readable({
      objectMode: true,
      read (size) {
        return true
      }
    })
    stream.pipe(call)
    const output = new Output()
    checkBlacklist.verify(call.request, output)
      .then(resp => {
        stream.push(resp)
        stream.push(null)
        stream.resume()
      })
      .catch(err => {
        this.logger.error('Error on checkBlacklist', err)
        stream.unpipe(call).destroy()
        err.code = status.INTERNAL
        call.emit('error', err)
      })
  }
  static removeBlacklist (call) {
    const stream = new Readable({
      objectMode: true,
      read (size) {
        return true
      }
    })
    stream.pipe(call)
    const output = new Output()
    removeBlacklist.delete(call.request, output)
      .then(resp => {
        stream.push(resp)
        stream.push(null)
        stream.resume()
      })
      .catch(err => {
        this.logger.error('Error on removeBlacklist', err)
        stream.unpipe(call).destroy()
        err.code = status.INTERNAL
        call.emit('error', err)
      })
  }
}
export default BlacklistRouter
