import Vue from 'vue'
import Vuex from 'vuex'
import get from 'lodash/get'
import filter from 'lodash/filter'

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
  moodList (state, moodList) {
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
  moodScatteredOverWeek: ({ moodList }) => chartDataHelper.scatterFeelingsOverWeek(moodList),
  moodList: ({ moodList = [] }) => chartDataHelper.extendWithHourAndDay(moodList),
  positiveMoods: (store, { moodList = [] }) => filter(moodList, { sentiment: 'positive' }),
  negativeMoods: (store, { moodList = [] }) => filter(moodList, { sentiment: 'negative' }),
  neutralMoods: (store, { moodList = [] }) => filter(moodList, { sentiment: 'neutral' })
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
