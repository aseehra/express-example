const express = require('express')

const ALLOWED_IPS = [
  '::1',
  '127.0.01'
]

const api = express.Router()

api.use((request, result, next) => {
  const userIsAllowed = ALLOWED_IPS.indexOf(request.ip) !== -1
  if (!userIsAllowed) {
    result.status(401).send('Not authorized')
  } else {
    next()
  }
})

module.exports = api
