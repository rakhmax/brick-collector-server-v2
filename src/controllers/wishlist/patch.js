import { Minifigure, Set } from '../../models'

export default async (ctx) => {
  try {
    const { itemId, type } = ctx.request.body

    let res

    if (type === 'M') {
      res = Minifigure.findOneAndUpdate(
        { userId: ctx.state.user.userId, itemId },
        { inWishlist: false },
        { new: true }
      )
    }
    if (type === 'S') {
      res = Set.findOneAndUpdate(
        { userId: ctx.state.user.userId, itemId },
        { inWishlist: false },
        { new: true }
      )
    }

    ctx.body = res
  } catch (error) {
    console.log(error);
    ctx.throw(error.status, error.message)
  }
}
