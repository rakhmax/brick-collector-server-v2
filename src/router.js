import Router from 'koa-router'
import categoriesRouter from './controllers/categories'
import priceGuideRouter from './controllers/priceGuide'
import searchRouter from './controllers/search'

const router = new Router()

router.use('/categories', categoriesRouter)
router.use('/price', priceGuideRouter)
router.use('/search', searchRouter)

export default router
