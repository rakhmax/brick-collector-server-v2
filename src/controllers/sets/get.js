import Set from '../../models/Set'

export default async (ctx) => {
  try {
    ctx.body = await Set.find({ userId: ctx.auth }).select(['-userId'])
  } catch (error) {
    console.log(error);
    ctx.throw(503, 'Could not get sets')
  }
}
