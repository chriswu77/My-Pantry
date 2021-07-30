const router = require('express').Router();
const controllers = require('./controllers');
const passport = require('./passport/index');

router.get('/user', controllers.getUserId);

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

router.get('/user/logout', controllers.logout);

module.exports = router;
