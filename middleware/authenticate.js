
export default function({ req, redirect, store} ) {
  if (process.server) {
    if (!req.signedCookies.token) {
      redirect('/');
      return;
    }
    store.commit('setToken', req.signedCookies.token.email);
    // store.commit('setTokenExp', req.signedCookies.token.email);
  } else {
    if (!store.state.token) { // TODO: need to check token exp. 
      console.log("Not LoggedIn");
      redirect('/');
    }
  } 
}