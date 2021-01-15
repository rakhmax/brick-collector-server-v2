import { Category } from 'brickbase-bricklink-api'

export default async (ctx) => {
  try {
    const req = await Category.all()
    const categories = await ctx.bricklink.send(req)

    ctx.body = categories.map((category) => ({
      id: category.category_id,
      name: category.category_name
    }))
  } catch (error) {
    throw ctx.throw(503, 'Could not get categories')
  }
}
