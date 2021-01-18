import Set from '../../models/Set'

export default async (ctx) => {
  try {
    const { itemId, ...data } = ctx.request.body

    ctx.body = await Set.findOneAndUpdate({ itemId, userId: ctx.auth }, data, { new: true })
  } catch (error) {
    console.log(error);
    ctx.throw(503, 'Could not get sets')
  }
}
