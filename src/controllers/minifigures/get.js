import Minifigure from '../../models/Minifigure'

export default async (ctx) => {
  try {
    ctx.body = await Minifigure.find({ userId: ctx.state.user.userId }).select(['-userId'])
  } catch (error) {
    console.log(error);
    ctx.throw(503, 'Could not get minifigures')
  }
}
