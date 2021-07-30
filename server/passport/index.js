const passport = require('passport');
const localStrategy = require('./localStrategy');
const User = require('../../database/models/user');

passport.serializeUser((user, done) => {
  console.log('serializeUser called, user: ');
  console.log(user);
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  console.log('deserializeUser called');
  console.log('id', id);
  User.findById(id, (err, user) => {
    console.log('deserialize user, user:');
    console.log(user);
    done(err, user);
  });
});

passport.use(localStrategy);

module.exports = passport;
