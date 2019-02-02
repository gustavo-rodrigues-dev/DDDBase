import { safeLoad } from 'js-yaml'
import fs from 'fs'

const config = safeLoad(fs.readFileSync(`./config.${process.env.NODE_ENV || 'development'}.yml`, 'utf8'))

export default config
