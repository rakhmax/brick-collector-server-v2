import axios from 'axios'

const checkKey = async (ctx) => {
  try {
    const { data } = await axios.get('https://brickset.com/api/v3.asmx/checkKey?apiKey=3-akLS-e1Dz-E9BP2')
    
    ctx.body = {
      data
    }
  } catch (error) {
    ctx.throw(error.status, error.message)
  }
}

export default checkKey
