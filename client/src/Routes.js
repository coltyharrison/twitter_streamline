import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Layout2 from './components/Layout2';

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Layout} />
          <Route exact path="/home" component={Layout2} />
        </div>
      </BrowserRouter>
    )
  }
}

export default Routes;
