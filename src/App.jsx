import React, { Component } from 'react';
import './App.css';

import Messenger from './components/Messenger/Messenger';
import SidePanel from './components/SidePanel/SidePanel';

class App extends Component {
  render() {
    return (
      <div id="frame">
        <SidePanel />
        <Messenger />
      </div>
    );
  }
}

export default App;
