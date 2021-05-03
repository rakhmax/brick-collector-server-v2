import axios from '../../axios'

export default async (ctx) => {
  try {
    const { type, query } = ctx.query

    let sdata, mdata

    if (type.includes('S')) {
      const { data } = await axios.get('/getSets',{
        params: {
          userHash: ctx.state.user.hash,
          params: JSON.stringify({ query })
        }
      })

      sdata = data
    }
    if (type.includes('M')) {
      const { data } = await axios.get('/getMinifigCollection',{
        params: {
          userHash: ctx.state.user.hash,
          params: JSON.stringify({ query })
        }
      })

      mdata = data
    }

    ctx.body = {
      minifigures: mdata?.minifigs.map((minifig) => ({
        itemId: minifig.minifigNumber,
        name: minifig.name,
        qty: minifig.ownedTotal,
        wanted: minifig.wanted
      })),
      sets: sdata?.sets.map((set) => ({
        number: set.number,
        numberVariant: set.numberVariant,
        name: set.name,
        image: set.image.thumbnailURL,
        collection: set.collection
      })),
    }
  } catch (error) {
    ctx.throw(501, 'No search result')
  }
}
