const express = require('express')
const passport = require('passport')

const auth = require('./auth/auth')
const User = require('./auth/user')

const router = express.Router()

router.use((request, result, next) => {
  result.locals.currentUser = request.user
  result.locals.errors = request.flash('error')
  result.locals.infos = request.flash('info')
  next()
})

router.get('/', (request, result, next) => {
  User
    .find()
    .sort({ createdAt: 'descending' })
    .then((users) => {
      result.render('index', {users: users})
    })
    .catch(next)
})

router.route('/signup')
  .get((request, result) => {
    result.render('signup')
  })
  .post((request, result, next) => {
    const username = request.body.username
    const password = request.body.password

    User.findOne({ username: username })
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
      .then(next, next)
  }, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  }))

router.get('/users/:username', (request, result, next) => {
  User.findOne({ username: request.params.username})
    .then((user) => {
      if (!user) { return next(404) }
      result.render('profile', { user: user})
    })
    .catch(next)
})

router.route('/login')
  .get((request, result) => {
    result.render('login')
  })
  .post(passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }))

router.get('/logout', (request, result) => {
  request.logout()
  result.redirect('/')
})

router.route('/edit')
  .all(auth.ensureAuthentication)
  .get((request, result) => {
    result.render('edit')
  })
  .post((request, result, next) => {
    request.user.displayName = request.body.displayname
    request.user.bio = request.body.bio
    request.user
      .save()
      .then((user) => {
        request.flash('info', 'Profile updated')
        result.redirect('/edit')
      })
      .catch(next)
  })

module.exports = router
