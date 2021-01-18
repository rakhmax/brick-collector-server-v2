import Minifigure from '../../models/Minifigure'

export default async (ctx) => {
  try {
    const { itemId, ...data } = ctx.request.body

    ctx.body = await Minifigure.findOneAndUpdate({ userId: ctx.auth, itemId }, data, { new: true })
  } catch (error) {
    console.log(error);
    ctx.throw(503, 'Could not update')
  }
}
