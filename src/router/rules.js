// TODO Include error handling https://images-na.ssl-images-amazon.com/images/G/01/lwa/dev/docs/website-sdk-reference._TTH_.pdf

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
