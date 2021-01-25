import { Category } from 'bricklink-api'

export default async (ctx) => {
  try {
    const req = await Category.all()
    const categories = await bricklink.send(req)

    ctx.body = categories.map((category) => ({
      id: category.category_id,
      name: category.category_name
    }))
  } catch (error) {
    console.log(error);
    ctx.throw(error.status, error.message)
  }
}
