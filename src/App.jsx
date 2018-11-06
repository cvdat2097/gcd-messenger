import React, { Component } from 'react';
import './App.css';

import Messenger from './components/Messenger/Messenger';
import SidePanel from './components/SidePanel/SidePanel';
import { MockDB } from './model/mockDB';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      messages: []
    }

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.getMessages = this.getMessages.bind(this);
  }

  componentWillMount() {
    this.handleChangeUsername();
    this.listenToSocket();
    this.setState({
      messages: this.getMessages() // Get messaging history
    });
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
    MockDB.webSocket.subscribe((noti) => {
      if (noti.action === MockDB.CONSTANTS.NEW_MSG) {
        this.setState({
          messages: this.getMessages(), // TODO:  Get NEW messages only
        });
      }
    });
  }

  getMessages() {
    // return messages list
    // GET method
    return MockDB.GETMessages(0, 100);
  }

  sendMessage(username, message) {
    // Send a POST request here
    console.log(`${username}: ${message}`);
    MockDB.POSTMessage(username, message);
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
          messages={this.state.messages}
        />
      </div>
    );
  }
}

export default App;
