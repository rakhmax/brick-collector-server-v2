import Set from '../../models/Set'

export default async (ctx) => {
  try {
    const Col = Set(ctx.auth)

    ctx.body = await Col.find({})
  } catch (error) {
    console.log(error);
    ctx.throw(503, 'Could not get sets')
  }
}