import axios from '../../axios'

export const getSingle = async (ctx) => {
  const { itemId } = ctx.params

  const promises = [
    axios.get('/getMinifigCollection', {
      params: {
        userHash: ctx.state.user.hash,
        Params: JSON.stringify({ query: itemId })
      }
    }),
    bricklink.getCatalogItem('Minifig', itemId),
    bricklink.getItemSubset('Minifig', itemId),
  ]

  const [
    { data },
    minifigFromBL,
    partsFromBL
  ] = await Promise.all(promises)

  ctx.body = {
    ...data.minifigs[0],
    year: minifigFromBL.year_released,
    parts: partsFromBL.map(({ entries }) => {
      const item = entries[0]

      return {
        color: item.color_id,
        qty: item.quantity,
        ...item.item
      }
    })
  }
}

export default async (ctx) => {
  try {
    const isWanted = ctx.params === 'wishlist' ? 'wanted' : 'owned'

    const { data } = await axios.get('/getMinifigCollection', {
      params: {
        userHash: ctx.state.user.hash,
        params: JSON.stringify({ [isWanted]: 1 })
      }
    })

    if (data.status !== 'success') {
      ctx.throw(403, data.message)
    }

    ctx.body = data.minifigs.map((minifig) => {
      let [theme, subtheme] = minifig.category.split('/')
      let itemId = minifig.minifigNumber

      delete minifig.category
      delete minifig.minifigNumber

      return {
        ...minifig,
        itemId,
        theme: theme.trim(),
        subtheme: subtheme.trim()
      }
    })
  } catch (error) {
    ctx.throw(error.status, error.message)
  }
}
