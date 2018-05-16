import React, { Component } from 'react';

import Link from 'next/link';
import Layout from '../components/Layout';
import Block from './blocks/show';

import web3 from '../ethereum/web3';


class App extends Component {
  render() {
    return (
      <Layout>
        <div className="App" >
          <div className="App-header" >
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
            <h2 > Block Explorer </h2>
          </div>
          <div className="App-nav" >
            <Link href="/blocks/">Blocks</Link>
          </div >
        </div>
      </Layout>
    );
  }
}
export default App;