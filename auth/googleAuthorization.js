const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2');

exports.setup = function () {
  // serialize the user session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
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
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
  },
  function (accessToken, refreshToken, profile, done) {
    findOrCreate(profile.id, accessToken, refreshToken, function (err, user) {
      return done(err, user);
    });
  }
));

}; // end of exports.setup

// find existing user or create new one if not found in DB
function findOrCreate(googleID, accessToken, refreshToken, done) {
  User.findUserById(googleID, accessToken, refreshToken).then(function (user) {

    if (user) { // if user found in DB, updates access and refresh tokens
      UserService.updateTokens(googleID, accessToken, refreshToken);
      return done(null, user);
    }

    if (!user) { // if user not found, creates new user
      UserService.createNewUser(googleID, accessToken, refreshToken).then(function (user) {
        return done(null, user);
      });
    };

  }).catch(function (err) {
    console.log('Error finding user', err);
    done(err);
  });
};
