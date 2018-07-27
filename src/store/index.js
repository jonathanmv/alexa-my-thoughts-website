import Vue from 'vue'
import Vuex from 'vuex'
import get from 'lodash/get'

import actions from './actions'

Vue.use(Vuex)

const mutations = {
  authorized (state, authorized) {
    state.authorized = authorized
  },
  profile (state, profile) {
    state.user = profile
  }
}

const getters = {
  isAuthorized: ({ authorized }) => authorized !== null,
  accessToken: ({ authorized }) => get(authorized, 'accessToken'),
  user: ({ user }) => user,
  userName: ({ user }) => get(user, 'Name'),
  userEmail: ({ user }) => get(user, 'PrimaryEmail'),
  userCustomerId: ({ user }) => get(user, 'CustomerId')
}

const store = new Vuex.Store({
  state: {
    authorized: null,
    user: null
  },
  getters,
  mutations,
  actions
})

export default store
