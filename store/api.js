export default {
  namespaced: true,
  state: () => ({
    serverUrl: process.env.SERVER_URL,
    isDataLoading: false
  })
}
