import { PriceGuide } from 'brickbase-bricklink-api'
import { formatPrice } from '../../helpers/formatters'

const getPriceGuide = async (ctx) => {
  try {
    const { itemId, type } = ctx.query

    const reqPriceGuideNew = await PriceGuide.get(type, itemId)
    const reqPriceGuideUsed = await PriceGuide.get(type, itemId, { new_or_used: 'U' })

    const priceGuideNew = await ctx.bricklink.send(reqPriceGuideNew)
    const priceGuideUsed = await ctx.bricklink.send(reqPriceGuideUsed)

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
    ctx.throw(501, 'Could not get categories')
  }
}

export default getPriceGuide
