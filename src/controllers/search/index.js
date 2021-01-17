import Router from 'koa-router'
import get from './get'

const searchRouter = new Router()

searchRouter.get('/', get)

export default searchRouter.routes()
