import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';

import Layout from './containers/Layout/Layout';
import MyFarms from './containers/MyFarms/MyFarms';
import Farm from './components/Farm/Farm';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          {/* <Route path='/example' component={Farm} /> */}
          <Route path='/' exact component={MyFarms} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
