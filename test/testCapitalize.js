import test from 'ava'
import capitalize from '../capitalize'

test('capitalize should capitalize single words', (t) => {
  t.is(capitalize('express'), 'Express')
  t.is(capitalize('cats'), 'Cats')
})

test('capitalize should make rest of string lowercase', (t) => {
  t.is(capitalize('javaScript'), 'Javascript')
})

test('capitalize should leave empty strings alone', (t) => {
  t.is(capitalize(''), '')
})

test('capitalize should leave strings with no words alone', (t) => {
  t.is(capitalize('  '), '  ')
  t.is(capitalize('123'), '123')
})

test(
  'Given a multiple-word string, capitalize should leave only the first letter capitalized',
  (t) => {
    t.is(capitalize('what is Express?'), 'What is express?')
    t.is(capitalize('i love lamp'), 'I love lamp')
  }
)

test('capitalize should keep already-capitalized words capitalized', (t) => {
  t.is(capitalize('Express'), 'Express')
  t.is(capitalize('Evan'), 'Evan')
  t.is(capitalize('Catman'), 'Catman')
})

test('Given a string object, captialize should not change its value', (t) => {
  const str = new String('who is JavaScript?')
  t.is(capitalize(str), 'Who is javascript?')
  t.is(str.valueOf(), 'who is JavaScript?')
})
