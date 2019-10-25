import Vuex from 'vuex'
import api from './api'
import phrases from './phrases'

new Vuex.Store({
  modules: {
    api,
    phrases
  }
})

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  }
}
