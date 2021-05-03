import { Client } from 'bricklink-api'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import session from 'koa-session'
import router from './router'
import {
  BRICKLINK_CONSUMER_KEY,
  BRICKLINK_CONSUMER_SECRET,
  BRICKLINK_TOKEN_VALUE,
  BRICKLINK_TOKEN_SECRET,
  CLIENT_URL,
  PORT
} from './config'

const app = new Koa()

global.bricklink = new Client({
  consumer_key: BRICKLINK_CONSUMER_KEY,
  consumer_secret: BRICKLINK_CONSUMER_SECRET,
  token: BRICKLINK_TOKEN_VALUE,
  token_secret: BRICKLINK_TOKEN_SECRET
});

app.use(bodyParser())
app.use(async ctx => cors({
  credentials: true,
  origin: process.env.NODE_ENV === 'development' ? ctx.headers.origin : CLIENT_URL
}))
app.use(session({ sameSite: null }, app))
app.use(router.routes())

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`))

export default app
