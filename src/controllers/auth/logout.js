import { Token } from '../../models'

const refreshToken = async (ctx) => {
  try {
    const { refreshToken } = ctx.request.body

    ctx.body = await Token.findOneAndDelete({ refreshToken })
  } catch (error) {
    ctx.throw(409, 'Unable to log out')
  }
}

export default refreshToken
