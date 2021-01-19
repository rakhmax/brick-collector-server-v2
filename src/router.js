import Router from 'koa-router'
import categoriesRouter from './controllers/categories'
import priceGuideRouter from './controllers/priceGuide'
import searchRouter from './controllers/search'
import minifiguresRouter from './controllers/minifigures'
import setsRouter from './controllers/sets'
import authRouter from './controllers/auth'

const publicRouter = new Router()

publicRouter.use('/auth', authRouter)

const protectedRouter = new Router()

protectedRouter.use('/categories', categoriesRouter)
protectedRouter.use('/price', priceGuideRouter)
protectedRouter.use('/search', searchRouter)
protectedRouter.use('/minifigures', minifiguresRouter)
protectedRouter.use('/sets', setsRouter)

export {
  publicRouter,
  protectedRouter
}
