import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import database from './database'
import router from './router'

const app = new Koa()

app.use(bodyParser())
app.use(cors())
app.use(router.routes())

database()

export default app
