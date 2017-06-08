import React, { Component } from 'react';
import './../App.css';
import { Button, Icon, Item, Sidebar, Modal, Header } from 'semantic-ui-react';
import axios from 'axios';

//component that renders all the incoming tweets

class TweetBox extends Component {
  constructor() {
    super();
    this.state = {
      tweets: [],
      modalOpen: false
    }
  }
  grabNewTweets() {
    axios.get('/index')
    .then((res) => {
      if (!res.data.errors) {
        this.setState(res.data);
        if (res.data.tweets.length === 0) {
          this.refreshTweets();
        }
      } else {
        console.log(res.data.errors);
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  refreshTweets() {
    axios.get('/refresh')
    .then((res) => {
      if (!res.data.errors) {
        console.log(res.data);
        this.setState(res.data);
      } else {
        console.log(res.data.errors);
      }
    })
  }

  componentDidMount() {
      this.grabNewTweets();
      this.interval = setInterval(this.grabNewTweets.bind(this), 5000);
      //send a call to check if new tweets have arrived via the twitter
      //stream api at a right of every 5 seconds
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  favoriteOrDestroy(tweet, favStatus) {
    const id = tweet.retweeted_status ?
    tweet.retweeted_status.id_str :
    tweet.id_str;

    const action = favStatus ?
    'destroy' : 'favorite';
    axios.get('/' + action + '/' + id)
    .then(() => {
      this.refreshTweets();
    });
  }

  retweet(tweet) {
    this.handleOpen();
    let id;
    if (tweet.retweeted_status) {
      id = tweet.retweeted_status.id_str;
    } else {
      id = tweet.id_str;
    }
    axios.get('/retweet/' + id)
    .then(() => {
      this.refreshTweets();
    });
  }

  handleOpen = (e) => this.setState({
    modalOpen: true,
  })

  handleClose = (e) => this.setState({
    modalOpen: false,
  })

  render() {
    const tweets = this.state.tweets.map((tweet, index) => {
      let content = tweet.retweeted_status ?
        {
          author: <a href={ 'http://www.twitter.com/' + tweet.retweeted_status.user.screen_name } target="_blank" rel="noopener noreferrer">{tweet.retweeted_status.user.name}</a>,
          avatar: tweet.retweeted_status.user.profile_image_url_https,
          retweeter: <div>-- <a href={ 'http://www.twitter.com/' + tweet.user.screen_name } target="_blank" rel="noopener noreferrer">{tweet.user.name}</a> retweed --</div>,
          text: tweet.retweeted_status.text,
          color: 'blue',
          favorited: tweet.retweeted_status.favorited,
          retweeted: tweet.retweeted_status.retweeted,
          key: tweet.retweeted_status.id + tweet.id
        } :
        {
          author: <a href={ 'http://www.twitter.com/' + tweet.user.screen_name } target="_blank" rel="noopener noreferrer">{tweet.user.name}</a>,
          avatar: tweet.user.profile_image_url_https,
          retweeter: null,
          text: tweet.text,
          color: 'teal',
          favorited: tweet.favorited,
          retweeted: tweet.retweeted,
          key: tweet.id
        };
      return (
        <Item key={content.key}>
          <Item.Image size="mini" src={content.avatar} />
          <Item.Content>
            <Item.Header>{content.author}</Item.Header>
            <Item.Meta>
              <span className='retweeter'>{content.retweeter}</span>
            </Item.Meta>
            <Item.Description>{content.text}</Item.Description>
            <Item.Extra>
              <Button compact size="mini" color="pink" basic={!content.favorited} icon onClick={() => this.favoriteOrDestroy(tweet, content.favorited)}>
                <Icon name='heart' />
              </Button>
              <Modal
              trigger={
                <Button compact size="mini" color="blue" basic={!content.retweeted} icon onClick={() => this.retweet(tweet)}>
                  <Icon name='retweet' />
                </Button>
              }
              open={this.state.modalOpen}
              onClose={this.handleClose}
              basic
              size='small'>
              <Header icon='checkmark' content='Sucess!' />
              <Modal.Content>
                <h3>Tweet was successfuly retweeed.</h3>
              </Modal.Content>
              <Modal.Actions>
                <Button color='green' onClick={this.handleClose} inverted>
                  OK
                </Button>
              </Modal.Actions>
            </Modal>
            </Item.Extra>
          </Item.Content>
        </Item>
      );
    })
    return (
      <Sidebar.Pusher>
        <Item.Group>
            {tweets}
        </Item.Group>
      </Sidebar.Pusher>
    )
  }
}

export default TweetBox;
