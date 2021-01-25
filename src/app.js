import { Client } from 'bricklink-api'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import jwt from 'koa-jwt'
import database from './database'
import { protectedRouter, publicRouter } from './router'
import {
  BRICKLINK_CONSUMER_KEY,
  BRICKLINK_CONSUMER_SECRET,
  BRICKLINK_TOKEN_VALUE,
  BRICKLINK_TOKEN_SECRET,
  JWT_SECRET
} from './config'

const app = new Koa()

global.bricklink = new Client({
  consumer_key: BRICKLINK_CONSUMER_KEY,
  consumer_secret: BRICKLINK_CONSUMER_SECRET,
  token: BRICKLINK_TOKEN_VALUE,
  token_secret: BRICKLINK_TOKEN_SECRET
});

app.use(bodyParser())
app.use(cors())
app.use(publicRouter.routes())
app.use(jwt({ secret: JWT_SECRET }))
app.use(protectedRouter.routes())

database()

export default app
