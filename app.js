const express = require('express')

const appBuilder = function appBuilder () {
  const app = express()

  app.get('/', (req, res) => {
    res.type('text')
    res.send(req.headers['user-agent'])
  })

  return app
}

module.exports = appBuilder
