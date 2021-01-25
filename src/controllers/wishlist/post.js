import { Minifigure, Set } from '../../models'

export default async (ctx) => {
  try {
    const { itemId, type, comment } = ctx.request.body

    let itemFromBL
    let Model

    if (type === 'M') {
      itemFromBL = await bricklink.getCatalogItem('Minifig', itemId)
      Model = Minifigure
    }

    if (type === 'S') {
      itemFromBL = await bricklink.getCatalogItem('Set', itemId)
      Model = Set
    }
    
    if (!itemFromBL.no) {
      ctx.throw(404, 'Minifigure not found')
    }

    const item = {
      comment,
      itemId: itemFromBL.no,
      userId: ctx.state.user.userId,
      name: itemFromBL.name,
      categoryId: itemFromBL.category_id,
      year: itemFromBL.year_released,
      inWishlist: true,
      qty: 1
    }

    const insertedItem = await Model.create(item)

    delete insertedItem.userId

    ctx.body = insertedItem
  } catch (error) {
    console.log(error);
    ctx.throw(error.status, error.message)
  }
}
