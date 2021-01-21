import jwt from 'jsonwebtoken'
import { Token } from '../../models'
import { JWT_TOKEN } from '../../config'

const refreshToken = async (ctx) => {
  try {
    const refreshToken = ctx.request.body && ctx.request.body.refreshToken

    const token = await Token.findOne({ refreshToken })

    if(token) {
      const { username, userId } = jwt.decode(refreshToken)
      
      const newAccessToken = jwt.sign({ username, userId }, JWT_TOKEN.access.secret, { expiresIn: JWT_TOKEN.access.lifetime })
      const newRefreshToken = jwt.sign({ username, userId }, JWT_TOKEN.refresh.secret, { expiresIn: JWT_TOKEN.refresh.lifetime })
      
      Token.deleteOne({ refreshToken })
      Token.create({ refreshToken: newRefreshToken })

      ctx.body = { accessToken: newAccessToken, refreshToken: newRefreshToken }
    }
  } catch (error) {
    ctx.throw(error.status, error.message)
  }
}

export default refreshToken
