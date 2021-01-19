import Router from 'koa-router'
import login from './login'
import logout from './logout'
import signup from './signup'
import refreshToken from './refreshToken'

const authRouter = new Router()

authRouter
  .post('/login', login)
  .post('/logout', logout)
  .post('/signup', signup)
  .post('/token', refreshToken)

export default authRouter.routes()
