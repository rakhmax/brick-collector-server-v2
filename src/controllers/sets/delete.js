import { Minifigure, Set } from '../../models'

export default async (ctx) => {
  try {
    const { itemId, minifigures, withMinifigures } = ctx.request.body


    if (withMinifigures) {
      const minifigsToRemove = []

      for (const minifig of minifigures) {
        const minifigToDelete = await Minifigure.findOne({ itemId: minifig.itemId, userId: ctx.state.user.userId })

        const newQty = minifigToDelete.qty - minifig.qty

        if (newQty > 0) {
          minifigsToRemove.push(Minifigure.findOneAndUpdate({ itemId: minifig.itemId, userId: ctx.state.user.userId }, { qty: newQty }, { new: true }))
        } else {
          minifigsToRemove.push(Minifigure.findOneAndDelete({ itemId: minifig.itemId, userId: ctx.state.user.userId }))
        }
      }

      ctx.body = {
        set: await Set.findOneAndDelete({ itemId, userId: ctx.state.user.userId }),
        minifigures: await Promise.all(minifigsToRemove)
      }
    } else {
      ctx.body = {
        set: await Set.findOneAndDelete({ itemId, userId: ctx.state.user.userId })
      }
    }
  } catch (error) {
    console.log(error);
    ctx.throw(503, 'Could not delete')
  }
}
