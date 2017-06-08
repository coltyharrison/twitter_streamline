const express = require('express'),
    app = express(),
    path = require('path'),
    bp = require('body-parser'),
    cors = require('cors'),
    passport = require('passport'),
    session = require('express-session'),
    twitter = require('./controllers/twitter.js'),
    TwitterStrategy = require('passport-twitter').Strategy,
    CONFIG = require('./config/config.js'),
    PORT = 3001;

app.use(express.static(path.join(__dirname, 'public')));
passport.use(new TwitterStrategy({
    consumerKey: CONFIG.CONSUMER_KEY,
    consumerSecret: CONFIG.CONSUMER_SECRET,
    callbackURL: "http://localhost:3001/auth/twitter/callback"
  }, function(token, tokenSecret, profile, cb) {
    twitter.addKeysAndStartStream(token, tokenSecret);
    return cb(null, profile);
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user._json);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


app.use(cors());
app.use(express.static(path.join(__dirname, '../client')));
app.use(bp.json());
app.use(session({
    secret: CONFIG.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));



app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/../client/public'));

require(path.join(__dirname, './config/routes.js'))(app);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
