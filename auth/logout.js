const router = require('express').Router();

router.route('/')
      .get(userLogout);

function userLogout(req, res) {
  req.logout();
  res.redirect('/');
};

module.exports = router;
