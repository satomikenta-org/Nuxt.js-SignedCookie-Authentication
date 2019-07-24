import axios from 'axios';
// CLASIC MODE

// import Vuex from 'vuex'

// const createStore = () => {
//   return new Vuex.Store({
//     state: {
//       token: null
//     },
//     mutations: {
//       setToken (state, payload) {
//         state.token = payload
//       },
//       removeToken( state ) {
//         state.token = null
//       }
//     },
//     actions: {
//       async login(vuexCtx) {
//         try {
//           await axios.post('/api/login', { email: 'satomi@gmail.com'});
//           vuexCtx.commit('setToken', 'satomi@gmail.com');
//           $router.push('/private');
//         } catch (ex) {
//           console.log(ex);
//         }
//       },
//       async logout(vuexCtx) {
//         try {
//           await axios.get('/api/logout');
//           vuexCtx.commit('removeToken');
//         } catch (ex) {
//           console.log(ex);
//         }
//       }
//     }
//   })
// }

// export default createStore


export const state = () => ({
  token: null
});

export const mutations = {
  setToken(state, payload) {
    state.token = payload;
  },
  removeToken(state) {
    state.token = null;
  }
};

export const actions = {
  async login(vuexCtx, cb) {
    try {
      await axios.post('/api/login', { email: 'satomi@gmail.com'});
      vuexCtx.commit('setToken', 'satomi@gmail.com');
      cb();
    } catch (ex) {
      console.log(ex);
    }
  },
  async logout(vuexCtx, cb) {
    try {
      await axios.get('/api/logout');
      vuexCtx.commit('removeToken');
      cb();
    } catch (ex) {
      console.log(ex);
    }
  }
}