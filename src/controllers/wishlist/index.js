import Router from 'koa-router'
import get from './get'
import post from './post'
import patch from './patch'
// import remove from './delete'

const wishlistRouter = new Router()

wishlistRouter
  .get('/', get)
  .post('/', post)
  .patch('/', patch)
  // .delete('/', remove)

export default wishlistRouter.routes()
