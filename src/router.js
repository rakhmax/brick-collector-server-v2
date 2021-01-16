import Router from 'koa-router'
import categoriesRouter from './controllers/categories'
import priceGuideRouter from './controllers/priceGuide'
import searchRouter from './controllers/search'
import minifiguresRouter from './controllers/minifigures'

const router = new Router()

router.use('/categories', categoriesRouter)
router.use('/price', priceGuideRouter)
router.use('/search', searchRouter)
router.use('/minifigures', minifiguresRouter)

export default router
