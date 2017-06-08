import React, { Component } from 'react';
import axios from 'axios';
import './../App.css';
import Home from './Home';
import Auth from './Auth';
import { Redirect } from 'react-router-dom';
import { Menu, Sidebar, Icon, Grid, Container } from 'semantic-ui-react';

// layout wrapper for logged in home page

class Layout2 extends Component {
  constructor() {
    super();
    this.state = {
      visible: false
    };
  }
  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  logOut = () => {
      axios.get('/logout')
      .then((res) => {
        localStorage.removeItem('userInfo');
        this.props.history.push('/');
      });
  }

  goToFavorites = () => {
    this.props.history.push('/favorites');
  }

  checkUser() {
    Auth.getUser((res) => {
      if (res.userInfo) {
        localStorage.setItem('userData', JSON.stringify(res.userInfo));
      } else {
      }
    });
  }

  componentDidMount() {
    let user = localStorage.getItem('userInfo');
    user = JSON.parse(user);
    if (!user) {
      this.checkUser();
    }
  }

  render() {
    let user = localStorage.getItem('userInfo');
    user = JSON.parse(user);
    const { visible } = this.state;
    const layout = user ?
    (
      <div>
        <Container fluid className="appHeader">
          <Grid padded className="appHeader">
            <Grid.Row>
              <Grid.Column width={4}>
                <Icon link name="sidebar" size="large" onClick={this.toggleVisibility} />
              </Grid.Column>
              <Grid.Column width={8} textAlign='center'>
                <p>Twitter StreamLine</p>
              </Grid.Column>
              <Grid.Column width={4} textAlign='right'>
                <p className="welcome">Welcome {user.name}!</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        <Sidebar.Pushable>
          <Sidebar as={Menu} animation='push' width='thin' visible={visible} icon='labeled' vertical inverted>
            <Menu.Item name='log out' onClick={this.logOut}>
              <Icon name='log out' />
              Log Out
            </Menu.Item>
          </Sidebar>
          <Home user={user} />
        </Sidebar.Pushable>
      </div>
      ) :
      <Redirect to="/" />;
    return layout;
  }
}

export default Layout2;
