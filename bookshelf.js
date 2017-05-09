const _ = require('lodash')

const knexfile = require('./knexfile')
const knex = require('knex')(knexfile)
const bookshelf = require('bookshelf')(knex)

// auto convert between camelCase and snake-case
const Model = bookshelf.Model.extend({
  parse: function (attr) {
    return _.reduce(attr, (record, val, key) => {
      record[_.camelCase(key)] = val
      return record
    }, {})
  },

  format: function (attr) {
    return _.reduce(attr, (record, val, key) => {
      record[_.snakeCase(key)] = val
      return record
    }, {})
  }
})

bookshelf.Model = Model

module.exports = bookshelf
