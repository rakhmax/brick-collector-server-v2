import { User } from '../../models'
import { hash } from 'bcrypt'

const signup = async (ctx) => {
  try {
    const { username, password } = ctx.request.body

    const user = await User.findOne({ username })

    if (user) {
      ctx.throw(409, 'User already exists')
    }
    
    const hashedPassword = await hash(password, 10)

    await User.create({...ctx.request.body, password: hashedPassword})

    ctx.body = 'Success'
  } catch (error) {
    ctx.throw(error.status, error.message)
  }
}

export default signup
