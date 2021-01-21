import { Client } from 'bricklink-api';
import {
  BRICKLINK_CONSUMER_KEY,
  BRICKLINK_CONSUMER_SECRET,
  BRICKLINK_TOKEN_VALUE,
  BRICKLINK_TOKEN_SECRET
} from '../config'

export default async (ctx, next) => {
  ctx.bricklink = new Client({
    consumer_key: BRICKLINK_CONSUMER_KEY,
    consumer_secret: BRICKLINK_CONSUMER_SECRET,
    token: BRICKLINK_TOKEN_VALUE,
    token_secret: BRICKLINK_TOKEN_SECRET
  });

  return next()
}
