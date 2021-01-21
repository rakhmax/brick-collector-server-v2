import { Token } from '../../models'

const refreshToken = async (ctx) => {
  try {
    const { refreshToken } = ctx.request.body

    ctx.body = await Token.findOneAndDelete({ refreshToken })
  } catch (error) {
    ctx.throw(error.status, error.message)
  }
}

export default refreshToken
