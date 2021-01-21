import Router from 'koa-router'
import get, { getSingle } from './get'
import post from './post'
import patch from './patch'
import remove from './delete'

const setsRouter = new Router()

setsRouter
  .get('/', get)
  .get('/:itemId', getSingle)
  .post('/', post)
  .patch('/', patch)
  .delete('/', remove)

export default setsRouter.routes()
