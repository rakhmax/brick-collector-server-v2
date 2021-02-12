import { Token } from '../../models'

const logout = async (ctx) => {
  try {
    const { refreshToken } = ctx.request.body

    ctx.body = await Token.findOneAndDelete({ refreshToken })
  } catch (error) {
    ctx.throw(error.status, error.message)
  }
}

export default logout
