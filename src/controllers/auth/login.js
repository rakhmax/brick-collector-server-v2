import axios from '../../axios'

const login = async (ctx) => {
  try {
    const { username, password } = ctx.request.body

    const { data } = await axios.get('/login', {
      params: {
        username,
        password
      }
    })

    if (data.status !== 'success') {
      ctx.throw(403, data.message)
    }

    ctx.body = {
      username,
      hash: data.hash,
    }
  } catch (error) {
    ctx.throw(error.status, error.message)
  }
}

export default login
