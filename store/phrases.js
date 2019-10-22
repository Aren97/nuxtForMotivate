import Axios from "axios"

export default {
  namespaced: true,
  state: () => ({
    data: [],
    isDataLoading: false,
    phraseUpdating: false,
    filters: {}
  }),
  mutations: {
    setIsDataLoading (state, payload) {
      state.isDataLoading = payload
    },
    setPhraseUpdating (state, payload) {
      state.phraseUpdating = payload
    },
    setPhrasesData (state, payload) {
      state.data = payload
    },
    setFilters (state, payload) {
      state.filters = payload
    },
    updatePhrase (state, payload) {
      state.data.splice(payload.index, 1, payload.data)
    }
  },
  actions: {
    // Получение фразы
    getPhrases ({commit, rootState}) {
      return new Promise((resolve, reject) => {
        commit('setIsDataLoading', true)
        Axios
          .get(rootState.api.serverUrl + 'phrases.php')
          .then((response) => {
            commit('setPhrasesData', response.data)
            resolve(response)
          })
          .catch((error) => {
            console.error(error)
            reject(error)
          })
          .finally(() => {
            commit('setIsDataLoading', false)
          })
      })
    },
    // Добавление фразы
    addPhrases ({commit, rootState}, payload) {
      return new Promise((resolve, reject) => {
        commit('setIsDataLoading', true)
        Axios
          .post(rootState.api.serverUrl + 'addPhrase.php', payload)
          .then((response) => {
            response = response.data
            console.log('store response', response)
            resolve(response)
          })
          .catch((error) => {
            console.error(error)
            reject(error)
          })
          .finally(() => {
            commit('setIsDataLoading', false)
          })
      })
    },
    // Обновление фразы
    updatePhrase ({commit, rootState}, payload) {
      if (payload.index > -1) {
        // Обновление в бд
        commit('setPhraseUpdating', true)
        Axios
          .post(rootState.api.serverUrl + 'updatePhrase.php', payload.data)
          .then(() => {
            // Обнавляем локально
            commit('updatePhrase', payload)
          })
          .catch((error) => {
            console.error(error)
          })
          .finally(() => {
            commit('setPhraseUpdating', false)
          })
      }
    },
    // Получение фильтров для фраз
    getFilters ({commit, rootState}, payload) {
      return new Promise((resolve, reject) => {
        commit('setIsDataLoading', true)
        Axios
          .post(rootState.api.serverUrl + 'getFilters.php', payload)
          .then((response) => {
            response = response.data

            commit('setFilters', response)
            resolve(response)
          })
          .catch((error) => {
            console.error(error)
            reject(error)
          })
          .finally(() => {
            commit('setIsDataLoading', false)
          })
      })
    }
  }
}
