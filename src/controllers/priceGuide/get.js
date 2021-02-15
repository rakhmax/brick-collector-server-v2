import { formatPrice } from '../../helpers/formatters'

export default async (ctx) => {
  try {
    const query = ctx.query

    if (query.type === 'Set' && query.itemId.split('-').length === 1) {
      query.type = 'Gear'
    }

    const { itemId, type } = query
    
    const [priceGuideNew, priceGuideUsed] = await Promise.all([
      bricklink.getPriceGuide(type, itemId, { country_code: 'RU' }),
      bricklink.getPriceGuide(type, itemId, {
        new_or_used: 'U',
        country_code: 'RU'
      })
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
