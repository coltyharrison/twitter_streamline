import React, { Component } from 'react';
import TweetBox from './TweetBox';
import Profile from './Profile';
import './../App.css';
import { Grid, Container } from 'semantic-ui-react';

//the component that contains the logged in display components

class Home extends Component {
  render() {
    return (
      <Container>
        <Grid divided padded>
          <Grid.Column width={9} className="tweetBox">
              <TweetBox />
          </Grid.Column>
          <Grid.Column width={7}>
            <Profile user={this.props.user} />
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

export default Home;
