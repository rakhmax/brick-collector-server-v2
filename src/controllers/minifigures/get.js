import Minifigure from '../../models/Minifigure'

export const getSingle = async (ctx) => {
  const promises = []

  promises.push(ctx.bricklink.getCatalogItem('Minifig', ctx.params.itemId))
  promises.push(ctx.bricklink.getItemSubset('Minifig', ctx.params.itemId))
  // const setsFromBL = await ctx.bricklink.getItemSuperset('Minifig', ctx.params.itemId)

  promises.push(Minifigure.findOne({ 
    itemId: ctx.params.itemId, 
    userId: ctx.state.user.userId 
  }).select(['-userId']))

  const [minifigFromBL, partsFromBL, minifigFromCol] = await Promise.all(promises)

  ctx.body = {
    itemId: minifigFromBL.no,
    name: minifigFromBL.name,
    categoryId: minifigFromBL.category_id,
    year: minifigFromBL.year_released,
    qty: minifigFromCol.qty,
    price: minifigFromCol.price,
    comment: minifigFromCol.comment,
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
    ctx.body = await Minifigure.find({ userId: ctx.state.user.userId }).select(['-userId'])
  } catch (error) {
    console.log(error);
    ctx.throw(error.status, error.message)
  }
}
