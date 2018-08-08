import { getService } from '@/modules/users/services'

const mutations = {
  registeringUser: (store, user) => {
    store.registeredUser = null
    store.registeringUser = user
    store.registeringError = null
  },
  userRegistered: (store, user) => {
    store.registeredUser = user
    store.registeringUser = null
    store.registeringError = null
  },
  userNotRegistered: (store, { user, error }) => {
    store.registeredUser = null
    store.registeringUser = null
    store.registeringError = error
  },
  validatingUserCode: (store, userCode) => {
    store.validatingUserCode = userCode
    store.validatedUserCode = null
    store.validatingUserCodeError = null
  },
  userCodeValidated: (store, userCode) => {
    store.validatingUserCode = null
    store.validatedUserCode = userCode
    store.validatingUserCodeError = null
  },
  userCodeNotValidated: (store, { userCode, error }) => {
    store.validatingUserCode = null
    store.validatedUserCode = null
    store.validatingUserCodeError = error
  }
}

const actions = {
  async registerUser ({ commit }, user) {
    commit('registeringUser', user)
    try {
      const result = await getService().registerUser(user)
      commit('userRegistered', result)
    } catch (error) {
      console.log(`Error registering user: ${error.message}`)
      commit('userNotRegistered', { user, error })
    }
  },
  async validateUserCode ({ commit, dispatch }, { email, userCode }) {
    commit('validatingUserCode', userCode)
    try {
      const result = await getService().validateUserCode({ email, userCode })
      console.log(result)
      commit('userCodeValidated', result)
      dispatch('redirect', '/', { root: true })
    } catch (error) {
      console.log(`Error validating user code: ${error.message}`)
      commit('userCodeNotValidated', { userCode, error })
    }
  }
}

const state = {
  registeringUser: null,
  registeringError: null,
  registeredUser: null,
  validatingUserCode: null,
  validatingUserCodeError: null,
  validatedUserCode: null
}

const statePropsGetters = state => Object.keys(state).reduce((map, property) => ({
  ...map,
  [property]: (state) => state[property]
}), {})

const getters = {
  ...statePropsGetters(state)
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
