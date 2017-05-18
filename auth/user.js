const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const SALT_FACTOR = 10

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  displayName: String,
  bio: String
})

userSchema.methods.name = function userSchemaName () {
  return this.dsiplayName || this.username
}

userSchema.pre('save', function userShemaPreSave (done) {
  if (!this.isModified('password')) {
    return done()
  }

  bcrypt.genSalt(SALT_FACTOR)
    .then(salt => bcrypt.hash(this.password, salt))
    .then((hashedPassword) => {
      this.password = hashedPassword
      done()
    })
    .catch(done)
})

userSchema.methods.checkPassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User
