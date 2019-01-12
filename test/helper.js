import assert from 'assert'
import supertest from 'supertest'
import app from '../src/index'
import { store } from '../src/infrastructure/repositories/index'
import Output from '../src/lib/output'

global.app = app
global.Output = Output
global.config = app.get('config')
global.store = store
global.assert = assert
global.request = supertest(app)
