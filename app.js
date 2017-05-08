const express = require('express')
const morgan = require('morgan')
const path = require('path')
const apiRouter = require('./routes/apiRouter')

const app = express()

app.use(morgan('short'))

const staticPath = path.resolve(__dirname, 'static')
app.use(express.static(staticPath))

app.use('/api', apiRouter)

app.use((request, response) => {
  response.status(400).send('Not found')
})

app.listen(3000)
