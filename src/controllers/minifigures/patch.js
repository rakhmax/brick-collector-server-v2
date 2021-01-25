import { Minifigure } from '../../models'

export default async (ctx) => {
  try {
    const { itemId, ...data } = ctx.request.body

    ctx.body = await Minifigure.findOneAndUpdate({ userId: ctx.state.user.userId, itemId }, data, { new: true })
  } catch (error) {
    console.log(error);
    ctx.throw(error.status, error.message)
  }
}
