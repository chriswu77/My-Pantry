const router = require('express').Router();
const controllers = require('./controllers');
const passport = require('./passport/index');

router.post('/user', controllers.createUser);

router.post(
  '/user/login',
  (req, res, next) => {
    console.log('login route, req.body: ', req.body);
    next();
  },
  passport.authenticate('local'),
  controllers.login
);

router.get('/user', controllers.getUserId);

module.exports = router;
