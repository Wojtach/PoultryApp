import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';

import Layout from './containers/Layout/Layout';
import MyFarms from './containers/MyFarms/MyFarms';
import FarmDetails from './containers/FarmDetails/FarmDetails';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path='/farmdetails/:farmName' component={FarmDetails} />
          <Route path='/' component={MyFarms} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
