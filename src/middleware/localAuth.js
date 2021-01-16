const localAuth = async (ctx, next) => {
  const { authorization } = ctx.request.headers

  if (!authorization) {
    ctx.auth = ''
    return next()
  }

  ctx.auth = authorization
  return next()
}

export default localAuth
