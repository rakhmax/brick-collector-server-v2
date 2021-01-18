import Set from '../../models/Set'

export default async (ctx) => {
  try {
    const { itemId, ...data } = ctx.request.body

    const Col = Set(ctx.auth)

    ctx.body = await Col.findOneAndUpdate({ itemId }, data, { new: true })
  } catch (error) {
    console.log(error);
    ctx.throw(503, 'Could not get sets')
  }
}
