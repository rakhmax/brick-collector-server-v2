import Minifigure from '../../models/Minifigure'

export default async (ctx) => {
  try {
    const { itemId, price, comment } = ctx.request.body
    
    const Col = Minifigure(ctx.auth)

    const minifigFromBL = await ctx.bricklink.getCatalogItem('Minifig', itemId)

    if (!minifigFromBL.no) {
      ctx.throw(404, 'Minifigure not found')
    }

    const minifig = {
      price,
      comment,
      itemId: minifigFromBL.no,
      name: minifigFromBL.name,
      categoryId: minifigFromBL.category_id,
      image: {
        base: minifigFromBL.image_url,
        thumbnail: minifigFromBL.thumbnail_url
      },
      year: minifigFromBL.year_released,
    }

    const insertedMinifig = await Col.create(minifig)

    ctx.body = insertedMinifig
  } catch (error) {
    console.log(error);
    ctx.throw(404, 'Minifigure not found')
  }
}
