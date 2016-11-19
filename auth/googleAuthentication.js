const router = require('express').Router();
const passport = require('passport');

router.get('/',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
    accessType: 'offline'
  }
));

router.get('/callback',
  passport.authenticate('google', {
    successRedirect: '/home',
    failureRedirect: '/auth/google/failure'
  }
));

module.exports = router;
