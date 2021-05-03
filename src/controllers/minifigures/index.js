import Router from 'koa-router'
import get, { getSingle } from './get'
import post from './post'

const minifiguresRouter = new Router()

minifiguresRouter
  .get('/', get)
  .get('/:itemId', getSingle)
  .post('/', post)

export default minifiguresRouter.routes()
