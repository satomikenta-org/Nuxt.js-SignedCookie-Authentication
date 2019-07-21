import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      token: null
    },
    mutations: {
      setToken (state, payload) {
        state.token = payload
      }
    }
  })
}

export default createStore