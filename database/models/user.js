const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.checkPasswords = async function (inputPassword) {
  const result = await bcrypt.compare(inputPassword, this.password);
  return result;
};

userSchema.methods.hashPassword = async function (plainTextPassword) {
  const hashedPassword = await bcrypt.hash(plainTextPassword, 12);
  return hashedPassword;
};

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    console.log('password was not modified. no hashing needed');
    return next();
  }
  this.password = this.hashPassword(this.password);
  console.log('hashed password in pre save');
  return next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
