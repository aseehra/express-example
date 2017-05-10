import test from 'ava'
import supertest from 'supertest'

import app from '../app'

let request

test.beforeEach((t) => {
  request = supertest(app.build())
    .get('/')
    .set('User-Agent', 'my cool browser')
    .set('Accept', 'text/plain')
})

test('Plain text API should return a plain text response', (t) => {
  return request
    .expect('Content-Type', /text\/plain/)
    .expect(200)
    .then(() => t.pass())
})

test('Plain text API should return the User Agent', (t) => {
  return request
    .then((res) => {
      t.is(res.text, 'my cool browser')
    })
})
