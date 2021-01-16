import Router from 'koa-router'
import get from './get'

const searchGuideRouter = new Router()

searchGuideRouter.get('/', get)

export default searchGuideRouter.routes()
