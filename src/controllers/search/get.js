import axios from 'axios'

export default async (ctx) => {
  try {
    const { type, q } = ctx.query

    const { data } = await axios.post('https://www.bricklink.com/ajax/clone/search/searchproduct.ajax', null, { 
      params: { type, q },
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36'
      }
    })

    ctx.body = data?.result?.typeList?.map((type) => {
      return type.items.map(({ strItemName, strItemNo, typeItem }) => ({
        itemId: strItemNo,
        name: `${strItemNo} ${strItemName}`,
        image: `https://img.bricklink.com/ItemImage/${typeItem}T/0/${strItemNo}.t1.png`,
        type: typeItem
      }))
    }).flat()
  } catch (error) {
    console.log(error);
    ctx.throw(501, 'No search result')
  }
}
