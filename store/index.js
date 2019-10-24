import Vuex from 'vuex'
import api from './api'
import phrases from './phrases'
import user from './user'

new Vuex.Store({
  modules: {
    api,
    phrases,
    user
  }
})

export const actions = {
  async nuxtServerInit ({ state, dispatch }, { req, res }) {
    console.log('req', req)
    console.log('res', res)
    // if (state.localStorage.user && state.localStorage.user.token) {
    //   try {
    //     let result = await dispatch('user/autoLoginUser', state.localStorage.user)
    //     console.log('result--', result)
    //   } catch (e) {
    //     console.error(e)
    //   }
    // }
  }
}
