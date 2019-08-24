const express = require('express')
const consola = require('consola')
const cookieParser = require('cookie-parser');
const { Nuxt, Builder } = require('nuxt')
const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  app.use(express.json());
  app.use(cookieParser('MY_SECRET'));
  
  
  app.post('/api/login', (req, res) => {
    const { email } = req.body;
    const info = {
      email,
      exp: new Date().getTime() + 10000
    }; 
    res.cookie('token', info, { signed: true, maxAge: 10000, httpOnly: true, sameSite: true });
    res.send('Login Success');
  });


  app.get('/api/checkauth', (req, res) => {
    if (!req.signedCookies.token) {
      return res.send({ isLoggedIn: false });
    } 
    if (req.signedCookies.token.exp < new Date().getTime()) {
      return res.send({ isLoggedIn: false });
    }
    res.send({ isLoggedIn: true, id: req.signedCookies.token.email });
  });

  app.get('/api/admin', (req, res) => {
    if (!req.signedCookies.token) {
      res.sendStatus(403);
    } else {
      // We also need to check cookie exp attr like below.
      if (req.signedCookies.token.exp < new Date().getTime()) {
        return res.sendStatus(403);
      }
      res.send({ msg: `You are ${req.signedCookies.token.email}`});
    }
  })

  app.get('/api/logout', (req, res) => {
    res.clearCookie('token');
    res.send('success logout');
  })
  
  // Give nuxt middleware to express
  app.use(nuxt.render)


  // Listen the server
  app.listen(port, '0.0.0.0') // Need To Change host when Prod. so I changed it to 0.0.0.0 
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
