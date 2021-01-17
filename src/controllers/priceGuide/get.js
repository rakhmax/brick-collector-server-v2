import { formatPrice } from '../../helpers/formatters'

const getPriceGuide = async (ctx) => {
  try {
    const { itemId, type } = ctx.query

    console.log();

    const priceGuideNew = await ctx.bricklink.getPriceGuide(type, itemId)
    const priceGuideUsed = await ctx.bricklink.getPriceGuide(type, itemId, { new_or_used: 'U' })

    ctx.body = {
      new: {
        min: formatPrice(priceGuideNew['min_price']),
        max: formatPrice(priceGuideNew['max_price']),
        avg: formatPrice(priceGuideNew['avg_price']),
        qtyAvg: formatPrice(priceGuideUsed['qty_avg_price'])
      },
      used: {
        min: formatPrice(priceGuideUsed['min_price']),
        max: formatPrice(priceGuideUsed['max_price']),
        avg: formatPrice(priceGuideUsed['avg_price']),
        qtyAvg: formatPrice(priceGuideUsed['qty_avg_price'])
      }
    }
  } catch (error) {
    console.log(error);
    ctx.throw(501, 'Could not get price guide')
  }
}

export default getPriceGuide
