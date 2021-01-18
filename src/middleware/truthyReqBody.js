export default async (ctx, next) => {
  const obj = {}
  const { body } = ctx.request

  for (const key in body) {
      if (body[key]) {
          obj[key] = body[key]
      }
  }

  ctx.request.body = obj

  return next()
}
