import Router from 'koa-router'
import categoriesRouter from './controllers/categories'
import priceGuideRouter from './controllers/priceGuide'
import searchRouter from './controllers/search'
import minifiguresRouter from './controllers/minifigures'
import setsRouter from './controllers/sets'
import authRouter from './controllers/auth'

const router = new Router()

router.use('/auth', authRouter)
router.use('/categories', categoriesRouter)
router.use('/price', priceGuideRouter)
router.use('/search', searchRouter)
router.use('/minifigures', minifiguresRouter)
router.use('/sets', setsRouter)

export default router
