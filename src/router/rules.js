// http://localhost:8080/#access_token=Atza%7CIwEBIHJfZf4vSb355MnNBLkvx-4hUPUbUGfYlYfx6gdFyPecTvVzTX8XC9sMw6CL_z2Xr-ABCqIY1jC5F4Re1Cw6jWBmxSQn-q7c8kcBQu93kIDMa-pmLsA--UMsRJtTw5OEISMeF6KLjYjPjzRKPINkxJnmTSbW1fTlNZU7HgM5JdO7hfairQQ7Q8jf35nbCHdQjWx9oOx1RzP0NE0jySIe3Tn9xnVq_T3nQochY2qcT1LBg0MciJlZpGxZ_cr1aMh2QGx9Iv49m9puL_dkCPa8IcXMqNpHtWhZdzmJKg8WB7JyPdmpQJ117KRkifNGNPO6XrKu_DaFBNe_Z59u7hypZRNPfDQaSpLHAi9PslWeteWb-yAZ9Wgq7qvcAkbYGVzRrPiQv49Vybf96QyyuVBJOZpkCA1GYUTEX0UMz2y0gCef4BM0-E6lwJWNEJXeQY9OLsszeRzMU-FGE_zMbkW-3EDScA-FWcpSDnck7TftcZST-ZbDxOZlGO7zZF5j3jwxVPzVMs_1td-xuV8DqUTpiX9UqvO7FPHVvBy7Qf_38tE04hLjLNepAz7IqEOzab5ZQfI&token_type=bearer&expires_in=3600&scope=profile
const isAuthRedirect = to => to.path.startsWith('/access_token=')
const buildAuthorizedObjectFromPath = path => {
  const queryParams = `?${path.slice(1)}`
  const url = new URL(queryParams, window.location.origin)
  const accessToken = url.searchParams.get('access_token')
  const tokenType = url.searchParams.get('token_type')
  const expiresIn = url.searchParams.get('expires_in')
  const scope = url.searchParams.get('scope')
  return { accessToken, tokenType, expiresIn, scope }
}

const apply = ({ router, store }) => {
  router.beforeEach((to, from, next) => {
    if (isAuthRedirect(to)) {
      const authorized = buildAuthorizedObjectFromPath(to.path)
      store.dispatch('authorized', authorized)
      next('/')
    } else {
      next()
    }
  })
}

export default { apply }
