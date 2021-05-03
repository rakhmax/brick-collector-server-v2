import Router from 'koa-router'
import get, { getSingle } from './get'
// import post from './post'

const setsRouter = new Router()

setsRouter
  .get('/', get)
  .get('/:itemId', getSingle)
  // .post('/', post)

export default setsRouter.routes()
