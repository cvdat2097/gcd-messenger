import React, { Component } from 'react';
import './App.css';

import Messenger from './components/Messenger/Messenger';
import SidePanel from './components/SidePanel/SidePanel';
import { MockDB, Users } from './model/mockDB';

import { CONSTANTS } from './environments/constants';

class App extends Component {
  nNewMsg = 0;

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      messages: [],
      activeUsers: [],
      currentPageIndex: 0
    }

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.getMessages = this.getMessages.bind(this);
    this.fetchMoreMessages = this.fetchMoreMessages.bind(this);
  }

  componentWillMount() {
    this.handleChangeUsername();
    this.listenToSocket();
    this.setState({
      messages: this.getMessages(), // Get messaging history
      activeUsers: MockDB.GETActiveUsers()
    });

    // TODO: remove this
    setInterval(() => {
      Users.push(Users[Math.round(Math.random())]);
      MockDB.webSocket.next({
        action: MockDB.CONSTANTS.NEW_USR
      });
    }, 5000);
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

  fetchMoreMessages(done) {
    this.nNewMsg += CONSTANTS.N_MESSAGES;
    setTimeout(() => {
      this.setState({
        messages: this.getMessages()
      });
      done();// TODO: move done() to async procedure
    }, 1000);
  }

  // Core methods
  listenToSocket() {
    MockDB.webSocket.subscribe((noti) => {
      switch (noti.action) {
        case MockDB.CONSTANTS.NEW_MSG:
          this.nNewMsg++;
          this.setState({
            messages: this.getMessages(), // TODO:  Get NEW messages only
          });
          break;

        case MockDB.CONSTANTS.NEW_USR:
          this.setState({
            activeUsers: MockDB.GETActiveUsers()
          });
          break;

        default:
          break;
      }
    });
  }

  getMessages() {
    // return messages list
    // GET method
    return MockDB.GETMessages(CONSTANTS.N_MESSAGES + this.nNewMsg);
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
          activeUsers={this.state.activeUsers}
        />
        <Messenger
          username={this.state.username}
          sendMessage={this.sendMessage}
          messages={this.state.messages}
          fetchMoreMessages={this.fetchMoreMessages}
        />
      </div>
    );
  }
}

export default App;
