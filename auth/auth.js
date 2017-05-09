const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('./user')

const setupPassport = function setupPassport () {
  passport.serializeUser((user, done) => {
    done(null, user.get('id'))
  })

  passport.deserializeUser((id, done) => {
    new User({id: id})
      .fetch()
      .then((user) => {
        done(null, user)
      })
      .catch(done)
  })

  const localStrategy = new LocalStrategy((username, password, done) => {
    new User({username: username})
      .fetch()
      .then((user) => {
        if (!user) {
          return done(null, false, { message: 'Invalid username' })
        }
        if (user.get('password') !== password) {
          return done(null, false, { message: 'Invalid password' })
        }
        done(null, user)
      })
      .catch(done)
  })
  passport.use(localStrategy)
}

const ensureAuthentication = function ensureAuthentication (request, result, next) {
  if (request.isAuthenticated()) {
    next()
  } else {
    request.flash('info', 'You must be logged in to see this page.')
    result.redirect('/login')
  }
}

module.exports.setupPassport = setupPassport
module.exports.ensureAuthentication = ensureAuthentication
