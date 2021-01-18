import Set from '../../models/Set'

export default async (ctx) => {
  try {
    const { itemId } = ctx.request.body

    const Col = Set(ctx.auth)

    ctx.body = await Col.findOneAndDelete({ itemId })
  } catch (error) {
    console.log(error);
    ctx.throw(503, 'Could not delete')
  }
}
