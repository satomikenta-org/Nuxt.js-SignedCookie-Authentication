import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      token: null,
      tokenExp: 0
    },
    mutations: {
      setToken (state, payload) {
        state.token = payload
      },
      removeToken( state ) {
        state.token = null
      }
    },
  })
}

export default createStore