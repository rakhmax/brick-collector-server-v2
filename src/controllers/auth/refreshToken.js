import jwt from 'jsonwebtoken'
import { Token } from '../../models'
import { JWT_TOKEN } from '../../config'

const refreshToken = async (ctx) => {
  try {
    const { refreshToken } = ctx.request.body

    const token = await Token.findOne({ refreshToken })

    if(token) {
      const { username, userId } = jwt.decode(refreshToken)

      const deletedToken = await Token.findOneAndDelete({ refreshToken })

      const decodedToken = jwt.verify(deletedToken.refreshToken, JWT_TOKEN.refresh.secret)

      if (!decodedToken) {
        ctx.auth(401, 'Unauthorized')
      }

      const newAccessToken = jwt.sign({ username, userId }, JWT_TOKEN.access.secret, { expiresIn: JWT_TOKEN.access.lifetime })
      const newRefreshToken = jwt.sign({ username, userId }, JWT_TOKEN.refresh.secret, { expiresIn: JWT_TOKEN.refresh.lifetime })

      await Token.create({ refreshToken: newRefreshToken })

      ctx.body = { accessToken: newAccessToken, refreshToken: newRefreshToken }
    } else {
      ctx.throw(400, 'Unable to refresh token')
    }
  } catch (error) {
    ctx.throw(400, 'Unable to refresh token')
  }
}

export default refreshToken
