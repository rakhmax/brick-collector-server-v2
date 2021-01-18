import { Types } from 'mongoose'
import Minifigure from '../../models/Minifigure'
import Set from '../../models/Set'

export default async (ctx) => {
  try {
    const { itemId, price, comment, sealed } = ctx.request.body

    const MinifigCol = Minifigure(ctx.auth)
    const SetCol = Set(ctx.auth)

    const setFromBL = await ctx.bricklink.getCatalogItem('Set', itemId)

    if (!setFromBL.no) {
      ctx.throw(404, 'Set not found')
    }

    const subsetFromBL = await ctx.bricklink.getItemSubset('Set', itemId)

    let pieces = 0
    let extraPieces = 0

    const minifigsFromBL = subsetFromBL.filter(({ entries }) => {
      pieces += entries[0].quantity
      extraPieces += entries[0].extra_quantity

      return entries[0].item.type === 'MINIFIG'
    })
    
    const minifigsPromises = minifigsFromBL.map(({ entries }) => ctx.bricklink.getCatalogItem('Minifig', entries[0].item.no))

    const minifigs = (await Promise.all(minifigsPromises)).map((minifig) => {
      return {
        _id: Types.ObjectId(),
        itemId: minifig.no,
        name: minifig.name,
        categoryId: minifig.category_id,
        image: {
          base: minifig.image_url,
          thumbnail: minifig.thumbnail_url
        },
        year: minifig.year_released,
        qty: minifigsFromBL.find(({ entries }) => entries[0].item.no === minifig.no).entries[0].quantity,
      }
    })

    const set = {
      price,
      sealed,
      pieces,
      comment,
      extraPieces,
      itemId: setFromBL.no,
      name: setFromBL.name,
      categoryId: setFromBL.category_id,
      image: {
          base: setFromBL.image_url,
          thumbnail: setFromBL.thumbnail_url
      },
      year: setFromBL.year_released,
      minifigures: minifigs.map(({ _id, qty }) => ({
        qty,
        id: _id
      })),
      qty: 1
    }

    let insertedSet = await SetCol.findOneAndUpdate({ itemId }, { $inc: { qty: 1 } }, { new: true })

    if (!insertedSet) {
      insertedSet = await SetCol.create(set)
    }

    const minifigsRes = []

    for (let minifig of minifigs) {
      const minifigExists = await MinifigCol.findOne({ itemId: minifig.itemId })

      if (minifigExists) {
        minifigsRes.push(MinifigCol.findOneAndUpdate({ itemId: minifig.itemId }, { $inc: { qty: minifig.qty } }, { new: true }))
      } else {
        minifigsRes.push(MinifigCol.create(minifig))
      }
    }

    const insertedMinifigs = await Promise.all(minifigsRes)

    ctx.body = {
      minifigures: insertedMinifigs,
      set: insertedSet
    }
  } catch (error) {
    console.log(error);
    ctx.throw(404, 'Set not found')
  }
}
