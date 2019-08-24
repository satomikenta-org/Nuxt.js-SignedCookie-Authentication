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
    const baseURL = `${window.location.href}`;
    return axios.get(`${baseURL}api/checkauth`) // need to return promise
    .then( res => {
      if (!res.data.isLoggedIn) {
        store.commit('removeToken');
        redirect('/');
        return;
      } 
      store.commit('setToken', res.data.id);
    })
    .catch(err => {
      store.commit('removeToken');
      redirect('/');
    })
  } 
}