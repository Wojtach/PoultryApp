import React, { Component } from 'react';

import Layout from './components/Layout/Layout';
import MyFarms from './containers/MyFarms/MyFarms'

class App extends Component {
  render() {
    return (
      <Layout>
        <MyFarms />
      </Layout>
    );
  }
}

export default App;
