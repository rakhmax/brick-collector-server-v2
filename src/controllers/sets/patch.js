import { Set } from '../../models'

export default async (ctx) => {
  try {
    const { itemId, ...data } = ctx.request.body

    ctx.body = await Set.findOneAndUpdate({ itemId, userId: ctx.state.user.userId }, data, { new: true })
  } catch (error) {
    console.log(error);
    ctx.throw(error.status, error.message)
  }
}
