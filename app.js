const express = require('express')
const path = require('path')

const appBuilder = function appBuilder () {
  const app = express()
  app.set('view engine', 'pug')
  app.set('views', path.join(__dirname, 'views'))

  app.get('/', (req, res) => {
    const userAgent = req.headers['user-agent'] || 'none'
    if (req.accepts('html')) {
      return res.render('index', { userAgent: userAgent })
    }

    res.type('text')
    res.send(userAgent)
  })

  app.set('port', process.env.PORT || 3000)
  return app
}

module.exports.build = appBuilder
