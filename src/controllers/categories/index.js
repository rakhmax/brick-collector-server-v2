import Router from 'koa-router'
import get from './get'

const categoriesRouter = new Router()

categoriesRouter.get('/', get)

export default categoriesRouter.routes()
