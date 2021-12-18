import { config } from "dotenv"

config()

export const BRICKLINK_CONSUMER_KEY = process.env.BRICKLINK_CONSUMER_KEY
export const BRICKLINK_CONSUMER_SECRET = process.env.BRICKLINK_CONSUMER_SECRET
export const BRICKLINK_TOKEN_VALUE = process.env.BRICKLINK_TOKEN_VALUE
export const BRICKLINK_TOKEN_SECRET = process.env.BRICKLINK_TOKEN_SECRET
export const MONGO_URI = process.env.MONGO_URI
export const PORT = process.env.PORT || 5002
export const JWT_SECRET = process.env.JWT_SECRET
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET
export const JWT_TOKEN = {
  access: {
    lifetime: 900,
    secret: JWT_SECRET
  },
  refresh: {
    lifetime: 604800,
    secret: JWT_REFRESH_SECRET
  }
}
