const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const connectFlash = require('connect-flash')
const express = require('express')
const expressSession = require('express-session')
const morgan = require('morgan')
const path = require('path')

const routes = require('./routes')

const app = express()
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.use(morgan('short'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(expressSession({
  secret: 'someRandomCrap',
  resave: true,
  saveUninitialized: true
}))
app.use(connectFlash())

app.use(routes)

app.listen(3000)
