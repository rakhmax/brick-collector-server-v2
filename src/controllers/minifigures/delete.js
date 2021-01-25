import { Minifigure } from '../../models'

export default async (ctx) => {
  try {
    const { itemId } = ctx.request.body

    ctx.body = await Minifigure.findOneAndDelete({ userId: ctx.state.user.userId, itemId })
  } catch (error) {
    console.log(error);
    ctx.throw(error.status, error.message)

  }
}
