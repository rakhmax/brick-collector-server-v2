import Router from 'koa-router'
import login from '../auth/login'
import signup from '../auth/signup'

const userRouter = new Router()

userRouter
  .post('/login', login)
  .post('/signup', signup)

export default userRouter.routes()
