const express = require('express')
const morgan = require('morgan')
const path = require('path')

const app = express()

app.use(morgan('short'))

const filePath = path.join(__dirname, 'celine.jpg')
app.use((req, res, next) => {
  res.sendFile(filePath, (err) => {
    if (err) {
      next(new Error('Error sending file'))
    }
  })
})

app.use((err, req, res, next) => {
  console.error(err)
  next(err)
})

app.use((dropError, req, res, next) => {
  res.status(500)
  res.end('Internal server error ')
})

app.listen(3000, () => {
  console.log('App started on port 3000')
})
