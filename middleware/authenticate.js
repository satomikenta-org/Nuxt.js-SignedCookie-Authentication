import axios from 'axios';

export default function( { req, redirect, store } ) {

  if (process.server) {
    if (!req.signedCookies.token) {
      redirect('/');
      return;
    }

    if (req.signedCookies.token.exp < new Date().getTime()) {
      redirect('/');
      return;
    }

    store.commit('setToken', req.signedCookies.token.email);
  } else {
    // client side
    return axios.get('/api/checkauth')
    .then( res => {
      if (!res.data.isLoggedIn) {
        store.commit('removeToken');
        return redirect('/');
      } 
      store.commit('setToken', res.data.id);
    })
    .catch(err => {
      console.log(err);
      store.commit('removeToken');
      redirect('/');
    })
  } 
}