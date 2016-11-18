module.exports = {
  sessionConfig: {
    secret: process.env.SECRET,
    key: 'user',
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 60 * 1000,
      secure: false
    }
  }
};
