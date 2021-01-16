import Router from 'koa-router'
import categoriesRouter from './controllers/categories'
import priceGuideRouter from './controllers/priceGuide'

const router = new Router()

router.use('/categories', categoriesRouter)
router.use('/price', priceGuideRouter)

export default router
