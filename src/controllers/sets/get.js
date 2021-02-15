import { Set } from '../../models'

export const getSingle = async (ctx) => {
  const { itemId } = ctx.params

  const promises = []

  if (itemId.split('-').length > 1) {
    promises.push(bricklink.getCatalogItem('Set', itemId))
    promises.push(bricklink.getItemSubset('Set', itemId))
  } else {
    promises.push(bricklink.getCatalogItem('Gear', itemId))
    promises.push(bricklink.getItemSubset('Gear', itemId))
  }

  promises.push(Set.findOne({ 
    itemId, 
    userId: ctx.state.user.userId 
  }).select(['-userId']))

  const [setFromBL, partsFromBL, setFromCol] = await Promise.all(promises)

  ctx.body = {
    itemId: setFromBL.no,
    name: setFromBL.name,
    categoryId: setFromBL.category_id,
    year: setFromBL.year_released,
    inWishlist: setFromCol.inWishlist,
    qty: setFromCol.qty,
    price: setFromCol.price,
    comment: setFromCol.comment,
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
