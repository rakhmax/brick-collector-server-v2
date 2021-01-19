import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import jwt from 'koa-jwt'
import database from './database'
import { protectedRouter, publicRouter } from './router'
import { bricklinkAuth, truthyReqBody } from './middleware'

const app = new Koa()

global.tokenList = {}

app.use(bodyParser())
app.use(cors())
app.use(truthyReqBody)
app.use(bricklinkAuth)
app.use(publicRouter.routes())
app.use(jwt({ secret: process.env.JWT_SECRET }))
app.use(protectedRouter.routes())

database()

export default app
