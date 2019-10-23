import Axios from "axios"

export default {
  state: () => ({
    isLoggined: false,
    token: '',
    userData: {},
    isUserDataLoading: false
  }),

  mutations: {
    userDataSet (state, payload) {
      state.userData = payload ? payload : {};

      if ( state.userData.id && state.userData.token ) {
        state.token = state.userData.token || ''
        state.isLoggined = true
      } else {
        state.isLoggined = false
        state.token = ''
        state.userData = {}
      }
      console.log('userData', state.userData)
    },
    setIsUserDataLoading (state, payload) {
      state.isUserDataLoading = payload
    }
  },


  actions: {
     signIn ({commit, rootState}, payload) {
      if (payload) {
        return new Promise((resolve, reject) => {
          commit('setIsUserDataLoading', true)
          Axios
            .post(rootState.api.serverUrl + 'signIn.php', payload)
            .then((response) => {
              console.log('response', response)
              response = response.data

              if (!response.notFound) {
                let userData = {
                  id: response.ID,
                  token: response.token
                }

                userData = JSON.stringify(userData)
                localStorage.removeItem('user-token')
                localStorage.removeItem('user')
                localStorage.setItem('user-token', response.token)
                localStorage.user = userData

                commit('userDataSet', JSON.parse(userData))
              }

            })
            .catch((error) => {
              console.error(error)
              reject(error)
            })
            .finally(() => {
              console.log(22)
              commit('setIsUserDataLoading', false)
            })
        })
      } else {
        localStorage.removeItem('user-token')
        localStorage.removeItem('user')
        commit('userDataSet')
      }

    },
    nuxtServerInit ({commit, rootState}, payload) {
      return new Promise((resolve, reject) => {

        commit('setIsUserDataLoading', true)

        const user = JSON.parse(payload.user)
        const token = user.token
        const user_id = user.id

        Axios
          .post(rootState.api.serverUrl + 'checkToken.php', {token, user_id})
          .then((response) => {
            response = response.data
            if (response.notFound) {
              commit('userDataSet')
            } else {
              commit('userDataSet', user)
            }
            resolve(response)
          })
          .catch(err => {
            commit('userDataSet');
            localStorage.removeItem('user-token')
            localStorage.removeItem('user')
            reject(err)
          })
          .finally(() => {
            commit('setIsUserDataLoading', false)
          })
      })
    }
  },

  getters: {
    isLoggined (state) {
      return state.isLoggined
    },
    userData (state) {
      if (state.userData.id) {
        return state.userData
      }
      return false
    },
    isUserDataLoading (state) {
      return state.isUserDataLoading
    }
  }
}
