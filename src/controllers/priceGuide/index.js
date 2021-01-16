import Router from 'koa-router'
import get from './get'

const priceGuideRouter = new Router()

priceGuideRouter.get('/', get)

export default priceGuideRouter.routes()
