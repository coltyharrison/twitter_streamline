import React, { Component } from 'react';
import './../App.css';
import Login from './Login';
import Auth from './Auth';
import { Redirect } from 'react-router-dom';
import { Container, Grid } from 'semantic-ui-react';

// layout wrapper for login page

class Layout extends Component {
  checkUser() {
    Auth.getUser((res) => {
      if (res.userInfo) {
        localStorage.setItem('userInfo', JSON.stringify(res.userInfo));
        this.props.history.push('/home');
      } else {
      }
    });
  }

  componentDidMount() {
    this.checkUser();
  }
  render() {
    let user = localStorage.getItem('userInfo');
    user = JSON.parse(user);
    const layout = user ?
    <Redirect to="/home" /> :
    <div>
      <Container fluid className="appHeader">
        <Grid padded className="appHeader">
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <p>Twitter StreamLine</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
      <div className="login_wrapper">
        <Login user={user}/>
      </div>
    </div>;
    return layout;
  }
}

export default Layout;
