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
  app.post('/login', (req, res) => {
    const { email } = req.body;
    res.cookie('token', email, { signed: true, maxAge: 30000  }); // if set httpOnly: true, cannot access cookie from client js code. 
    res.send('Login Success');
  });

  app.get('/admin', (req, res) => {
    console.log("Req Cookie", req.signedCookies);
    if (!req.signedCookies.token) {
      res.sendStatus(403);
    } else {
      res.send({ msg: `You are ${req.signedCookies.token}`});
    }
  })

  app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.send('success logout');
  })
  
  // Give nuxt middleware to express
  app.use(nuxt.render)


  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
