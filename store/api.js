export default {
  namespaced: true,
  state: () => ({
    serverUrl: 'https://arenmotivate.ru/back/',
    isDataLoading: false
  }),
  mutations: {
    change (state) {
      state.serverUrl = 'test'
    }
  }
}
