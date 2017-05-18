const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const connectFlash = require('connect-flash')
const express = require('express')
const expressSession = require('express-session')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const passport = require('passport')

const routes = require('./routes')
const auth = require('./auth/auth')

const app = express()
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://localhost:27017/expressbook')

auth.setupPassport()

app.use(morgan('short'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(expressSession({
  secret: 'someRandomCrap',
  resave: true,
  saveUninitialized: true
}))
app.use(connectFlash())

app.use(passport.initialize())
app.use(passport.session())

app.use(routes)

app.listen(3000)
