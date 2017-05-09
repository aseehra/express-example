const bookshelf = require('../bookshelf')

const User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  name: function name () {
    return this.get('displayName') || this.get('username')
  }
})

module.exports = User
