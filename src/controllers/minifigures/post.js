import { Minifigure } from '../../models'

export default async (ctx) => {
  try {
    const { itemId, price, comment } = ctx.request.body
    
    const minifigFromBL = await bricklink.getCatalogItem('Minifig', itemId)

    if (!minifigFromBL.no) {
      ctx.throw(404, 'Minifigure not found')
    }

    const minifig = {
      price,
      comment,
      itemId: minifigFromBL.no,
      userId: ctx.state.user.userId,
      name: minifigFromBL.name,
      categoryId: minifigFromBL.category_id,
      year: minifigFromBL.year_released,
      qty: 1
    }

    const insertedMinifig = await Minifigure.create(minifig)

    delete insertedMinifig.userId

    ctx.body = insertedMinifig
  } catch (error) {
    console.log(error);
    ctx.throw(error.status, error.message)
  }
}
