import { Types } from 'mongoose'
import { Minifigure, Set } from '../../models'

export default async (ctx) => {
  try {
    const { itemId, type } = ctx.request.body

    let res

    if (type === 'M') {
      res = await Minifigure.findOneAndUpdate(
        { userId: ctx.state.user.userId, itemId },
        { $unset: { inWishlist: 1 } },
        { new: true }
      )
    }
    if (type === 'S') {
      const subsetFromBL = await bricklink.getItemSubset('Set', itemId)

      const minifigsFromBL = subsetFromBL.filter(({ entries }) => {
        return entries[0].item.type === 'MINIFIG' && !entries[0].is_counterpart
      })
      
      const minifigsPromises = minifigsFromBL.map(({ entries }) => {
        return bricklink.getCatalogItem('Minifig', entries[0].item.no)
      })

      const minifigs = (await Promise.all(minifigsPromises)).map((minifig) => {
        return {
          _id: Types.ObjectId(),
          itemId: minifig.no,
          userId: ctx.state.user.userId,
          name: minifig.name,
          categoryId: minifig.category_id,
          year: minifig.year_released,
          qty: minifigsFromBL.find(({ entries }) => entries[0].item.no === minifig.no).entries[0].quantity,
        }
      })

      const minifigsRes = []

      for (let minifig of minifigs) {
        const minifigExists = await Minifigure.findOne({ itemId: minifig.itemId, userId: ctx.state.user.userId })

        if (minifigExists) {
          minifigsRes.push(Minifigure.findOneAndUpdate(
            { itemId: minifig.itemId, userId: ctx.state.user.userId },
            { $inc: { qty: minifig.qty } },
            { new: true }
          ))
        } else {
          minifigsRes.push(Minifigure.create(minifig))
        }
      }

      const minifigures = await Promise.all(minifigsRes)
      const set = await Set.findOneAndUpdate(
        { userId: ctx.state.user.userId, itemId },
        { 
          minifigures: minifigs.map(({ itemId, qty }) => ({ qty, itemId })),
          $unset: { inWishlist: 1 }
        },
        { new: true }
      )

      res = { minifigures, set }
    }

    ctx.body = res
  } catch (error) {
    console.log(error);
    ctx.throw(error.status, error.message)
  }
}
