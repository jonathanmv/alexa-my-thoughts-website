/* global amazon */

const {
  LOGIN_WITH_AMAZON_CLIENT_ID,
  LOGIN_WITH_AMAZON_REDIRECT_URL
} = process.env

const authentication = {
  setUpLoginWithAmazon ({ dispatch }) {
    window.onAmazonLoginReady = () => {
      amazon.Login.setClientId(LOGIN_WITH_AMAZON_CLIENT_ID)
      dispatch('loadProfile')
    }

    (d => {
      const c = d.getElementsByTagName('head')[0]
      const a = d.createElement('script')
      a.type = 'text/javascript'
      a.async = true
      a.id = 'amazon-login-sdk'
      a.src = 'https://api-cdn.amazon.com/sdk/login1.js'
      c.appendChild(a)
    })(document)
  },
  login () {
    const options = { scope: 'profile', popup: false }
    amazon.Login.authorize(options, LOGIN_WITH_AMAZON_REDIRECT_URL)
  },
  logout (context) {
    amazon.Login.logout()
    context.commit('authorized', null)
    context.commit('profile', null)
  },
  authorized ({ commit, dispatch }, authorized) {
    commit('authorized', authorized)
  },
  loadProfile ({ getters, commit }) {
    const { accessToken } = getters
    if (accessToken) {
      amazon.Login.retrieveProfile(accessToken, ({ profile }) => {
        if (profile) {
          commit('profile', profile)
        }
      })
    }
  }
}

export default {
  ...authentication
}
