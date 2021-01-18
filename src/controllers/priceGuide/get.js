import { formatPrice } from '../../helpers/formatters'

export default async (ctx) => {
  try {
    const { itemId, type } = ctx.query
    
    const [priceGuideNew, priceGuideUsed] = await Promise.all([
      ctx.bricklink.getPriceGuide(type, itemId),
      ctx.bricklink.getPriceGuide(type, itemId, { new_or_used: 'U' })
    ])

    ctx.body = {
      new: {
        min: formatPrice(priceGuideNew.min_price),
        max: formatPrice(priceGuideNew.max_price),
        avg: formatPrice(priceGuideNew.avg_price),
        qtyAvg: formatPrice(priceGuideUsed.qty_avg_price)
      },
      used: {
        min: formatPrice(priceGuideUsed.min_price),
        max: formatPrice(priceGuideUsed.max_price),
        avg: formatPrice(priceGuideUsed.avg_price),
        qtyAvg: formatPrice(priceGuideUsed.qty_avg_price)
      }
    }
  } catch (error) {
    console.log(error);
    ctx.throw(501, 'Could not get price guide')
  }
}
