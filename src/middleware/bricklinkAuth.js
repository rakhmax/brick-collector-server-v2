import { Client } from 'brickbase-bricklink-api';
import {
  BRICKLINK_CONSUMER_KEY,
  BRICKLINK_CONSUMER_SECRET,
  BRICKLINK_TOKEN_VALUE,
  BRICKLINK_TOKEN_SECRET
} from '../config'

const bricklinkAuth = async (ctx, next) => {
  ctx.bricklink = new Client({
    consumer_key: BRICKLINK_CONSUMER_KEY,
    consumer_secret: BRICKLINK_CONSUMER_SECRET,
    token: BRICKLINK_TOKEN_VALUE,
    token_secret: BRICKLINK_TOKEN_SECRET
  });

  return next()
}

export default bricklinkAuth
