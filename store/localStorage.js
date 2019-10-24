export const state = () => ({
  user: null,
  loggedIn: false
})
export const mutations = {
  setUserLocalStorage (state, payload) {
    state.user = payload
  },
  setUserLoggedIn (state, payload) {
    state.loggedIn = payload
  }
}

