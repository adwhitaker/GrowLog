require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');

const googleAuthorization = require('./auth/googleAuthorization');
const googleAuthentication = require('./auth/googleAuthentication');
const sessionConfig = require('./auth/sessionConfig');
const logout = require('./auth/logout');
const addSeed = require('./routes/addSeed');
const seedsInUse = require('./routes/seedsInUse');
const activity = require('./routes/activity');
const location = require('./routes/location');
const reports = require('./routes/reports');


const app = express();

// middleware
googleAuthorization.setup();
app.use(session(sessionConfig.sessionConfig));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

//route connections
app.use('/auth/google', googleAuthentication);
app.use('/addSeed', addSeed);
app.use('/seedsInUse', seedsInUse);
app.use('/activity', activity);
app.use('/location', location);
app.use('/logout', logout);
app.use('/reports', reports);

// sets index.html as main file
// check if user is authenticated
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

// server connection
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Listening on port', port);
});
