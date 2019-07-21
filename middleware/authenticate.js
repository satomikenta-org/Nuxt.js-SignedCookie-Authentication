import Cookies from 'js-cookie'; 

export default function({ req, redirect, store} ) {
  if (process.server) {
    if (!req.signedCookies.token) {
      redirect('/');
      return;
    } 
    store.commit('setToken', req.signedCookies.token);
  } else {
    if (!Cookies.get('token')) {
      redirect('/');
      return;
    }
    store.commit('setToken', Cookies.get('token'));
  } 
}