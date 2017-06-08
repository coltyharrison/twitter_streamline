import React, { Component } from 'react';
import './../App.css';
import { Segment, Image } from 'semantic-ui-react';

//profile for logged in user featuring picture, name, and description

class UserInfo extends Component {
  render() {
    const userInfo = this.props.user;
    const profilePic = userInfo.profile_image_url_https.replace('_normal', '');
    const profileBG = userInfo.profile_banner_url ?
    {
      background: 'url(' + userInfo.profile_banner_url + ')'
    } :
    {
      background: '#' + userInfo.profile_background_color
    };
    return (
      <Segment.Group>
        <Segment className='profileInfo' style={profileBG} padded>
          <Image src={profilePic} size="small" shape='circular' centered/>
          <h1>{userInfo.name}</h1>
        </Segment>
        <Segment>
          <p>{userInfo.description}</p>
        </Segment>
      </Segment.Group>
    )
  }
}

export default UserInfo;
