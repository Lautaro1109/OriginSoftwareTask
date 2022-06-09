import { Router } from 'express'

import login from './login.js'
import user from './user.js'
import symbol from './symbols.js'

const routes = Router()

routes.use('/login', login)
routes.use('/users', user)
routes.use('/symbol', symbol)

export default routes
