export default {
  namespaced: true,
  state: () => ({
    serverUrl: process.env.serverUrl,
    isDataLoading: false
  })
}
