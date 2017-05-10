import cheerio from 'cheerio'
import test from 'ava'
import supertest from 'supertest'

import app from '../app'

let request

test.beforeEach((t) => {
  request = supertest(app.build())
    .get('/')
    .set('User-Agent', 'a cool browser')
    .set('Accept', 'text/html')
})

test('HTML API should return an HTML response', (t) => {
  return request
    .expect('Content-Type', /html/)
    .expect(200)
    .then(() => t.pass())
})

test('HTML API should return the User Agent', (t) => {
  return request
    .then((res) => {
      const $ = cheerio.load(res.text)
      const userAgent = $('.user-agent').html().trim()
      t.is(userAgent, 'a cool browser')
    })
})
