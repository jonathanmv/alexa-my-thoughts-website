import Vue from 'vue'
import Vuex from 'vuex'
import get from 'lodash/get'

import actions from './actions'
import chartDataHelper from './chartDataHelper'

Vue.use(Vuex)

const mutations = {
  authorized (state, authorized) {
    state.authorized = authorized
  },
  profile (state, profile) {
    state.user = profile
  },
  moodListLoaded (state, moodList) {
    state.moodList = moodList
  }
}

const getters = {
  isAuthorized: ({ authorized }) => authorized !== null,
  accessToken: ({ authorized }) => get(authorized, 'accessToken'),
  user: ({ user }) => user,
  userName: ({ user }) => get(user, 'name'),
  userEmail: ({ user }) => get(user, 'email'),
  userId: ({ user }) => get(user, 'user_id'),
  moodScatteredOverWeek: ({ moodList }) => chartDataHelper.scatterFeelingsOverWeek(moodList)
}

const store = new Vuex.Store({
  state: {
    authorized: null,
    user: null,
    moodList: []
  },
  getters,
  mutations,
  actions
})

export default store
