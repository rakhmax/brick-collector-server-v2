import { Minifigure, Set } from '../../models'

export default async (ctx) => {
  try {
    const minifigsInWishlist = await Minifigure.find({
      userId: ctx.state.user.userId,
      inWishlist: true
    }).select(['-userId', '-__v'])

    const setsInWishlist = await Set.find({
      userId: ctx.state.user.userId,
      inWishlist: true
    }).select(['-userId', '-__v'])

    ctx.body = {
      minifigures: minifigsInWishlist,
      sets: setsInWishlist,
    }
  } catch (error) {
    console.log(error);
    ctx.throw(error.status, error.message)
  }
}
