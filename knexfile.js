module.exports = {
  client: 'mysql',
  connection: process.env.DATABASE_URL || 'mysql://express_book@localhost/express_book'
}
