import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import database from './database'
import router from './router'
import bricklinkAuth from './middleware/bricklinkAuth'

const app = new Koa()

app.use(bodyParser())
app.use(cors())
app.use(bricklinkAuth)
app.use(router.routes())

database()

export default app
