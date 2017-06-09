const Twit = require('twit'),
      CONFIG = require('./../config/config.js');
let twitConfig = {
        tokens: {},
        secrets: {}
      },
      tweets = {};


module.exports = {
  addKeysAndStartStream: function(token, tokenSecret, profile) {
    twitConfig.tokens[profile.id_str] = token;
    twitConfig.secrets[profile.id_str] = tokenSecret;
    //initial tweets
    const twit = new Twit({
      consumer_key: CONFIG.CONSUMER_KEY,
      consumer_secret: CONFIG.CONSUMER_SECRET,
      access_token: twitConfig.tokens[profile.id_str],
      access_token_secret: twitConfig.secrets[profile.id_str]
    });
    twit.get('statuses/home_timeline', {count: 50, inclue_rts: true}, function(err, data, response) {
      if (err) {
        console.log(err);
      } else {
        tweets[profile.id_str] = data;
      }
    })
    // open stream that automatically pulls in new tweets
    var stream = twit.stream('user', {})
    stream.on('tweet', function (tweet) {
      // populates the tweets array and keeps it at a count of 50
      tweets[profile.id_str].unshift(tweet);
      tweets[profile.id_str].pop();
    })
  },

  // sends user data
  getUser: (req, res) => {
    req.user ? res.json({
      userInfo: req.user
    }) : res.json(false);
  },

  //sends populated tweet array
  getTweets: (req, res) => {
    res.json({tweets: tweets[req.user.id_str]});
  },

  // creates a new tweet
  createTweet: (req, res) => {
    const twit = new Twit(twitConfig);
    twit.post('statuses/update', { status: req.body.value }, function(err, data, response) {
      if (!err) {
        res.json(true);
      } else {
        res.json(err);
      }
    })
  },

  //favorites tweet
  favoriteTweet: (req, res) => {
    const twit = new Twit({
      consumer_key: CONFIG.CONSUMER_KEY,
      consumer_secret: CONFIG.CONSUMER_SECRET,
      access_token: twitConfig.tokens[req.user.id_str],
      access_token_secret: twitConfig.secrets[req.user.id_str]
    });
    twit.post('favorites/create', { id: req.params.id }, function(err, data, response) {
      if (!err) {
        res.json(true);
      } else {
        console.log(err);
        res.json(err);
      }
    })
  },

  //unfavorites a tweet
  destroyTweet: (req, res) => {
    const twit = new Twit({
      consumer_key: CONFIG.CONSUMER_KEY,
      consumer_secret: CONFIG.CONSUMER_SECRET,
      access_token: twitConfig.tokens[req.user.id_str],
      access_token_secret: twitConfig.secrets[req.user.id_str]
    });
    twit.post('favorites/destroy', { id: req.params.id }, function(err, data, response) {
      if (!err) {
        res.json(true);
      } else {
        console.log(err);
        res.json(err);
      }
    })
  },

  //gets new json data for the timeline
  refresh: (req, res) => {
    const twit = new Twit({
      consumer_key: CONFIG.CONSUMER_KEY,
      consumer_secret: CONFIG.CONSUMER_SECRET,
      access_token: twitConfig.tokens[req.user.id_str],
      access_token_secret: twitConfig.secrets[req.user.id_str]
    });
    twit.get('statuses/home_timeline', {count: 50, inclue_rts: true}, function(err, data, response) {
      if (err) {
        console.log(err);
      } else {
        tweets[req.user.id_str] = data;
      }
      res.json({tweets: tweets[req.user.id_str]});
    })
  },

  //retweets a particular tweet
  retweet: (req, res) => {
    const twit = new Twit({
      consumer_key: CONFIG.CONSUMER_KEY,
      consumer_secret: CONFIG.CONSUMER_SECRET,
      access_token: twitConfig.tokens[req.user.id_str],
      access_token_secret: twitConfig.secrets[req.user.id_str]
    });
    twit.post('statuses/retweet/:id', { id: req.params.id }, function (err, data, response) {
      if (!err) {
        res.json(true);
      } else {
        console.log(err);
        res.json(err);
      }
    })
  },

  //logs out user of session
  logout: (req, res) => {
    req.logout();
    res.redirect('/');
  }
};
