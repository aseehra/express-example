const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('./user')

const setupPassport = function setupPassport () {
  passport.serializeUser((user, done) => {
    console.log(user._id)
    console.log(user.id)
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, done)
  })

  const localStrategy = new LocalStrategy((username, password, done) => {
    User
      .findOne({ username: username })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: 'Invalid username' })
        }

        user.checkPassword(password)
          .then((passwordMatches) => {
            if (!passwordMatches) {
              return done(null, false, { message: 'Invalid password' })
            }

            done(null, user)
          })
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
