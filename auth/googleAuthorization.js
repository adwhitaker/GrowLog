const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2');
const UserService = require('../services/users');

exports.setup = function () {
  // serialize the user session
  passport.serializeUser(function (user, done) {
    console.log('user', user);
    done(null, user.google_id);
  });

  // deserialize the user session
  passport.deserializeUser(function (id, done) {
    UserService.findUserById(id).then(function (user) {
      return done(null, user);
    }).catch(function (err) {
      done(err);
    });
  });

  // find or create Google user
  passport.use(new GoogleStrategy({
    authorizationURL: process.env.AUTHORIZATION_URL,
    tokenURL: process.env.TOKEN_URL,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
  },
  function (accessToken, refreshToken, profile, done) {

    var userName = `${profile.name.givenName} ${profile.name.familyName}`;

    findOrCreate(profile.id, userName, profile.email, accessToken, refreshToken,
      function (err, user) {
        return done(err, user);
      });
  }
));

}; // end of exports.setup

// find existing user or create new one if not found in DB
function findOrCreate(googleID, userName, userEmail, accessToken, refreshToken, done) {
  UserService.findUserById(googleID, accessToken, refreshToken).then(function (user) {

    if (user) { // if user found in DB, updates access and refresh tokens
      return UserService.updateTokens(googleID, userName, userEmail, accessToken, refreshToken)
      .then(function (user) {
        return done(null, user);
      });
    }

    if (!user) { // if user not found, creates new user
      return UserService.createNewUser(googleID, userName, userEmail, accessToken, refreshToken)
      .then(function (user) {
        return done(null, user);
      });
    };

  }).catch(function (err) {
    console.log('Error finding user', err);
    done(err);
  });
};
