import { Types } from 'mongoose'
import { Minifigure, Set } from '../../models'

export default async (ctx) => {
  try {
    const { itemId, price, comment, sealed, type } = ctx.request.body

    const t = type === 'G' ? 'Gear' : 'Set';

    const setFromBL = await bricklink.getCatalogItem(t, itemId)

    if (!setFromBL.no) {
      ctx.throw(404, 'Set not found')
    }

    const subsetFromBL = await bricklink.getItemSubset(t, itemId)

    const minifigsFromBL = subsetFromBL.filter(({ entries }) => {
      return entries[0].item.type === 'MINIFIG' && !entries[0].is_counterpart
    })
    
    const minifigsPromises = minifigsFromBL.map(({ entries }) => {
      return bricklink.getCatalogItem('Minifig', entries[0].item.no)
    })

    const minifigs = (await Promise.all(minifigsPromises)).map((minifig) => {
      return {
        _id: Types.ObjectId(),
        itemId: minifig.no,
        userId: ctx.state.user.userId,
        name: minifig.name,
        categoryId: minifig.category_id,
        year: minifig.year_released,
        year: minifig.year_released,
        image: minifig.image_url,
        qty: minifigsFromBL.find(({ entries }) => entries[0].item.no === minifig.no).entries[0].quantity,
      }
    })

    const set = {
      price,
      sealed,
      comment,
      itemId: setFromBL.no,
      userId: ctx.state.user.userId,
      name: setFromBL.name,
      categoryId: setFromBL.category_id,
      year: setFromBL.year_released,
      image: setFromBL.image_url,
      thumbnail: setFromBL.thumbnail_url,
      minifigures: minifigs.map(({ itemId, qty }) => ({ qty, itemId })),
      qty: 1
    }

    let insertedSet = await Set.findOneAndUpdate(
      { itemId, userId: ctx.state.user.userId },
      { $inc: { qty: 1 } },
      { new: true }
    )

    if (!insertedSet) {
      insertedSet = await Set.create(set)
    }

    const minifigsRes = []

    for (let minifig of minifigs) {
      const minifigExists = await Minifigure.findOne({ itemId: minifig.itemId, userId: ctx.state.user.userId })

      if (minifigExists) {
        minifigsRes.push(Minifigure.findOneAndUpdate(
          { itemId: minifig.itemId, userId: ctx.state.user.userId },
          { $inc: { qty: minifig.qty } },
          { new: true }
        ))
      } else {
        minifigsRes.push(Minifigure.create(minifig))
      }
    }

    const insertedMinifigs = await Promise.all(minifigsRes)

    ctx.body = {
      minifigures: insertedMinifigs,
      set: insertedSet
    }
  } catch (error) {
    console.log(error);
    ctx.throw(error.status, error.message)
  }
}
