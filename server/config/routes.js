const twitter = require('./../controllers/twitter.js')
      passport = require('passport');


module.exports = (app) => {
    //twitter auth call
    app.get('/auth/twitter', passport.authenticate('twitter'));

    //auth callback
    app.get('/auth/twitter/callback',
      passport.authenticate('twitter', {
        failureRedirect: '/'
      }), (req, res) => {
        res.redirect('/');
      });

      // route to check if user is logged in
    app.get('/getUser', (req, res) => {
      twitter.getUser(req, res);
    })

    // gets all tweets
    app.get('/index', (req, res) => {
      twitter.getTweets(req, res);
    })

    //post request to create a tweet
    app.post('/createTweet', (req, res) => {
      twitter.createTweet(req, res);
    })

    //favorites a tweet
    app.get('/favorite/:id', (req, res) => {
      twitter.favoriteTweet(req, res);
    })

    app.get('/destroy/:id', (req, res) => {
      twitter.destroyTweet(req, res);
    })

    //retweets a tweet
    app.get('/retweet/:id', (req, res) => {
      twitter.retweet(req, res);
    })

    //logs a user out of app and removes from session
    app.get('/logout', (req, res) => {
      twitter.logout(req, res);
    });

    // refreshes tweets to include fresh json data for favorite and retweet status
    app.get('/refresh', (req, res) => {
      twitter.refresh(req, res);
    });
};
