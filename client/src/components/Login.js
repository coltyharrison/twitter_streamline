import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';

// log in window that authenticates and logs in a user with twitter

class Login extends Component {
  render() {
    return (
      <div className="login_window">
        <h1>Welcome!</h1>
        <a href="/auth/twitter">
          <Button color='twitter'>
            <Icon name='twitter' /> Log In With Twitter
          </Button>
        </a>
      </div>
    )
  }
}

export default Login;
