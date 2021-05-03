import axios from '../../axios'

export const getSingle = async (ctx) => {
  const { itemId } = ctx.params
  const { hash } = ctx.state.user

  const promises = [
    axios.get('/getSets', {
      params: {
        userHash: hash,
        Params: JSON.stringify({ setNumber: itemId })
      }
    }),
    axios.get('/getInstructions2', {
      params: {
        userHash: hash,
        setNumber: itemId
      }
    }),
    bricklink.getCatalogItem('Set', itemId),
    bricklink.getItemSubset('Set', itemId),
  ]

  const [
    { data },
    { data: instructions },
    setFromBL,
    partsFromBL,
  ] = await Promise.all(promises)

  const setFromBS = data.sets.map((set) => {
    return {
      bricksetId: set.setID,
      number: set.number,
      numberVariant: set.numberVariant,
      name: set.name,
      year: set.year,
      theme: set.theme,
      subtheme: set.subtheme,
      pieces: set.pieces,
      image: set.image,
      rating: set.rating,
      collection: set.collection
    }
  })

  ctx.body = {
    ...setFromBS[0],
    instructions: instructions.instructions,
    year: setFromBL.year_released,
    parts: partsFromBL.map(({ entries }) => {
      const item = entries[0]

      return {
        color: item.color_id,
        qty: item.quantity,
        isCounterpart: item.is_counterpart,
        ...item.item
      }
    })
  }
}

export default async (ctx) => {
  try {
    const isWanted = ctx.params === 'wishlist' ? 'wanted' : 'owned'

    const { data } = await axios.get('/getSets', {
      params: {
        userHash: ctx.state.user.hash,
        params: JSON.stringify({ [isWanted]: 1 })
      }
    })

    if (data.status !== 'success') {
      ctx.throw(403, data.message)
    }

    ctx.body = data.sets.map((set) => {
      return {
        bricksetId: set.setID,
        number: set.number,
        numberVariant: set.numberVariant,
        name: set.name,
        year: set.year,
        theme: set.theme,
        subtheme: set.subtheme,
        pieces: set.pieces,
        image: set.image,
        rating: set.rating,
        collection: set.collection
      }
    })
  } catch (error) {
    ctx.throw(error.status, error.message)
  }
}
