const express = require('express')

const User = require('./auth/user')

const router = express.Router()

router.use((request, result, next) => {
  result.locals.currentUser = request.user
  result.locals.errors = request.flash('error')
  result.locals.infos = request.flash('info')
  next()
})

router.get('/', (request, result, next) => {
  User.forge()
    .orderBy('-created_at')
    .fetchAll()
    .then((users) => {
      result.render('index', {users: users})
    })
})

module.exports = router
