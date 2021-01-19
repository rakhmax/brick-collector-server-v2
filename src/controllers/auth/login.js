import { User } from '../../models'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Token } from '../../models'
import { JWT_TOKEN } from '../../config'


const login = async (ctx) => {
  try {
    const { username, password } = ctx.request.body

    const user = await User.findOne({ username })

    if (!user) {
      ctx.throw(401, 'No user found or wrong password')
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
      ctx.throw(401, 'No user found or wrong password')
    }

    const payload = {
      userId: user.id,
      username: user.username
    }

    const accessToken = jwt.sign(payload, JWT_TOKEN.access.secret, { expiresIn: JWT_TOKEN.access.lifetime })
    const refreshToken = jwt.sign(payload, JWT_TOKEN.refresh.secret, { expiresIn: JWT_TOKEN.refresh.lifetime })

    await Token.create({ refreshToken })

    ctx.body = {
      accessToken,
      refreshToken,
    }
  } catch (error) {
    ctx.throw(error.status, error.message)
  }
}

export default login
