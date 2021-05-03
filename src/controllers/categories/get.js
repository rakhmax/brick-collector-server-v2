import axios from '../../axios'

export default async (ctx) => {
  try {
    const { data } = await axios.get('/getThemes')

    if (data.status !== 'success') {
      ctx.throw(403, data.message)
    }

    ctx.body = data.themes
  } catch (error) {
    ctx.throw(error.status, error.message)
  }
}
