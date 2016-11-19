const router = require('express').Router();
const passport = require('passport');

// allows access to google profile info
router.get('/',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
    // accessType: 'offline'
  }
));

// after the user is authenticated they are sent here
router.get('/callback',
  passport.authenticate('google', {
    successRedirect: '/home',
    failureRedirect: '/auth/google/failure'
  }
));

module.exports = router;
