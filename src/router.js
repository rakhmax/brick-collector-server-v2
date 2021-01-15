import Router from 'koa-router'
import CategoriesRouter from './controllers/categories'

const router = new Router()

router.use('/categories', CategoriesRouter)

export default router
