import { Set } from '../../models'

export const getSingle = async (ctx) => {
  const { itemId } = ctx.params

  const promises = []

  promises.push(bricklink.getCatalogItem('Set', itemId))
  promises.push(bricklink.getItemSubset('Set', itemId))
  // const setsFromBL = await bricklink.getItemSuperset('Minifig', ctx.params.itemId)

  promises.push(Set.findOne({ 
    itemId, 
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
        isCounterpart: item.is_counterpart,
        ...item.item
      }
    })
  }
}

export default async (ctx) => {
  try {
    ctx.body = await Set.find({
      userId: ctx.state.user.userId,
      inWishlist: null
    }).select(['-userId', '-__v'])
  } catch (error) {
    console.log(error)
    ctx.throw(error.status, error.message)
  }
}
