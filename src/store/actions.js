/* global amazon */
import axios from 'axios'

const {
  LOGIN_WITH_AMAZON_CLIENT_ID,
  LOGIN_WITH_AMAZON_REDIRECT_URL,
  BACKEND_URL,
  NODE_ENV
} = process.env

const isDev = NODE_ENV === 'development'

if (isDev) {
  import('@/store/mockedBackend')
    .then(mocked => mocked.default(axios))
}

const authentication = {
  setUpLoginWithAmazon ({ dispatch }) {
    if (isDev) {
      return
    }

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
  async login ({ dispatch }) {
    if (isDev) {
      const { data: authorized } = await axios.get('/authorize')
      dispatch('authorized', authorized)
      dispatch('loadProfile')
      return
    }

    const options = { scope: 'profile', popup: false }
    amazon.Login.authorize(options, LOGIN_WITH_AMAZON_REDIRECT_URL)
  },
  logout ({ dispatch }) {
    if (!isDev) {
      amazon.Login.logout()
    }
    dispatch('cleanUserData')
  },
  cleanUserData ({ commit }) {
    commit('authorized', null)
    commit('profile', null)
    commit('moodList', [])
  },
  authorized ({ commit }, authorized) {
    commit('authorized', authorized)
  },
  async loadProfile ({ getters, commit, dispatch }) {
    const { accessToken } = getters
    if (accessToken) {
      try {
        const url = `https://api.amazon.com/user/profile?access_token=${accessToken}`
        const { data: profile } = await axios(url)
        commit('profile', profile)
        dispatch('listMood')
      } catch (error) {
        console.log(`Error getting user profile: ${error.message}`)
        console.log(error)
      }
    }
  }
}

const backend = {
  async listMood ({ getters, commit }) {
    const { accessToken } = getters
    if (!accessToken) {
      return Promise.reject(new Error('No accessToken found'))
    }

    const url = BACKEND_URL + '/feeling'
    const headers = {
      Authorization: accessToken
    }
    const { data } = await axios(url, { headers })
    commit('moodList', data)
  }
}

export default {
  ...authentication,
  ...backend
}
