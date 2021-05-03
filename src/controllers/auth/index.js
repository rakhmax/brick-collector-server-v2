import Router from 'koa-router'
import login from './login'

const authRouter = new Router()

authRouter
  .post('/login', login)

export default authRouter.routes()
