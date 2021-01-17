import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import database from './database'
import router from './router'
import bricklinkAuth from './middleware/bricklinkAuth'
import localAuth from './middleware/localAuth'

const app = new Koa()

app.use(bodyParser())
app.use(cors())
app.use(bricklinkAuth)
app.use(localAuth)
app.use(router)

database()

export default app
