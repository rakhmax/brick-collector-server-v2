import Router from 'koa-router'
import get from './get'
import post from './post'
import patch from './patch'
import remove from './delete'

const minifiguresRouter = new Router()

minifiguresRouter
  .get('/', get)
  .post('/', post)
  .patch('/', patch)
  .delete('/', remove)

export default minifiguresRouter.routes()
