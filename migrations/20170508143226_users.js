exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('users', (table) => {
    table.increments('id').primary()
    table.string('username', 190).unique().notNullable()
    table.string('password')
    table.dateTime('created_at')
    table.dateTime('updated_at')
    table.string('display_name')
    table.string('bio')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users')
}
