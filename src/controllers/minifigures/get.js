import Minifigure from '../../models/Minifigure'

export default async (ctx) => {
  try {
    const Col = Minifigure(ctx.auth)

    ctx.body = await Col.find({})
  } catch (error) {
    ctx.throw(503, 'Could not get minifigures')
  }
}
