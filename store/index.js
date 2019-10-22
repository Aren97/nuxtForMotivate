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
