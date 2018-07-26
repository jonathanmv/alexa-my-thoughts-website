import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const mutations = {
  authorized (state, authorized) {
    state.authorized = authorized
  }
}

const getters = {
  isAuthorized ({ authorized }) {
    return authorized !== null
  },
  accessToken ({ authorized }) {
    if (authorized) {
      return authorized.accessToken
    }
    return null
  }
}

const actions = {
  logout (context) {
    context.commit('authorized', null)
  }
}

const store = new Vuex.Store({
  state: {
    authorized: null
  },
  getters,
  mutations,
  actions
})

export default store
