import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';

import Layout from './containers/Layout/Layout';
import HomePage from './components/HomePage/HomePage';
import MyFarms from './containers/MyFarms/MyFarms';
import FarmDetails from './containers/FarmDetails/FarmDetails';
import HallManagement from './containers/HallManagement/HallManagement';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path='/myfarms/:farmName/:hallName/:hallId' component={HallManagement} />
          <Route path='/myfarms/farmdetails/:farmName' component={FarmDetails} />
          <Route path='/myfarms' component={MyFarms} />
          <Route path='/' component={HomePage} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
