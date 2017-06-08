import React, { Component } from 'react';
import UserInfo from './UserInfo';
import './../App.css';
import CreateTweetBox from './CreateTweetBox';

// right side of the log in page featuring user information and the create tweet form

class Profile extends Component {
  render() {
    return (
      <div>
        <UserInfo user={this.props.user} />
        <CreateTweetBox />
      </div>
    )
  }
}

export default Profile;
