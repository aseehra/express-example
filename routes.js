const express = require('express')
const passport = require('passport')

const User = require('./auth/user')

const router = express.Router()

router.use((request, result, next) => {
  result.locals.currentUser = request.user
  result.locals.errors = request.flash('error')
  result.locals.infos = request.flash('info')
  next()
})

router.get('/', (request, result, next) => {
  User.fetchAll()
    .then((users) => {
      result.render('index', {users: users.toArray()})
    })
    .catch((err) => {
      next(err)
    })
})

router.route('/signup')
  .get((request, result) => {
    result.render('signup')
  })
  .post((request, result, next) => {
    const username = request.body.username
    const password = request.body.password

    new User({username: username}).fetch()
      .then((user) => {
        if (user) {
          request.flash('error', 'User already exists')
          return result.redirect('/signup')
        }

        const newUser = new User({
          username: username,
          password: password
        })
        return newUser.save()
      })
      .tap((user) => {
        if (user) {
          result.send('added')
          next()
        }
      })
      .catch(next)
  }, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  }))

module.exports = router
