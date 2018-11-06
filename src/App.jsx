import React, { Component } from 'react';
import './App.css';

import Messenger from './components/Messenger/Messenger';
import SidePanel from './components/SidePanel/SidePanel';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ''
    }

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.getMessages = this.getMessages.bind(this);
  }

  componentWillMount() {
    this.handleChangeUsername();
    this.listenToSocket();
  }

  handleChangeUsername() {
    let username = 'Mikeross';
    // while (!username) {
    //   username = window.prompt('Enter username: ', 'Mikeross')
    // }
    console.log(`Current user: ${username}`);
    this.setState({
      username: username
    })
  }

  listenToSocket() {

  }

  getMessages() {
    // return messages list
    // GET method
  }

  sendMessage(username, message) {
    // Send a POST request here
    console.log(`${username}: ${message}`);
  }



  render() {
    return (
      <div id="frame">
        <SidePanel
          username={this.state.username}
          onChangeUsername={this.handleChangeUsername}
        />
        <Messenger
          username={this.state.username}
          sendMessage={this.sendMessage}
        />
      </div>
    );
  }
}

export default App;
