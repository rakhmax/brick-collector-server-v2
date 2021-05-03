import axios from '../../axios'

export default async (ctx) => {
  try {
    const { itemId, qty, want } = ctx.request.body

    const isWanted = want ? 1 : 0
    
    const { data } = await axios.get('/setMinifigCollection', {
      params: {
        userHash: ctx.state.user.hash,
        minifigNumber: itemId,
        params: JSON.stringify({ qtyOwned: qty, want: isWanted })
      }
    })

    if (data.status !== 'success') {
      ctx.throw(403, data.message)
    }

    ctx.body = data.status
  } catch (error) {
    ctx.throw(error.status, error.message)
  }
}
