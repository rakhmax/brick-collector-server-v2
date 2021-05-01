import { Set } from '../../models'
// import puppeteer from 'puppeteer'

export const getSingle = async (ctx) => {
  const { itemId } = ctx.params

  const promises = []

  if (itemId.split('-').length > 1) {
    promises.push(bricklink.getCatalogItem('Set', itemId))
    promises.push(bricklink.getItemSubset('Set', itemId))
  } else {
    promises.push(bricklink.getCatalogItem('Gear', itemId))
    promises.push(bricklink.getItemSubset('Gear', itemId))
  }

  promises.push(Set.findOne({ 
    itemId, 
    userId: ctx.state.user.userId 
  }).select(['-userId']))

  const [setFromBL, partsFromBL, setFromCol] = await Promise.all(promises)

  // const browser = await puppeteer.launch()
  // const page = await browser.newPage()
  // await page.goto(`https://www.wildberries.ru/catalog/0/search.aspx?search=lego%20${itemId.slice(0, -2)}&sort=popular`)
  // const wildberries = await page.evaluate(() => {
  //   const foundProduct = document.querySelector('.catalog_main_table')
  //   if (foundProduct) {
  //     const link = 'https://www.wildberries.ru' + document.querySelector('.ref_goods_n_p').getAttribute('href')
  //     const price = document.querySelector('.lower-price').innerText
  //     return { link, price }
  //   }
  //   return undefined;
  // });

  // browser.close()

  ctx.body = {
    itemId: setFromBL.no,
    name: setFromBL.name,
    categoryId: setFromBL.category_id,
    year: setFromBL.year_released,
    inWishlist: setFromCol.inWishlist,
    qty: setFromCol.qty,
    price: setFromCol.price,
    comment: setFromCol.comment,
    // retailPrice:{
    //   wildberries,
    //   ozon
    // },
    parts: partsFromBL.map(({ entries }) => {
      const item = entries[0]

      return {
        color: item.color_id,
        qty: item.quantity,
        isCounterpart: item.is_counterpart,
        ...item.item
      }
    })
  }
}

export default async (ctx) => {
  try {
    ctx.body = await Set.find({
      userId: ctx.state.user.userId,
      inWishlist: null
    }).select(['-userId', '-__v'])
  } catch (error) {
    console.log(error)
    ctx.throw(error.status, error.message)
  }
}
