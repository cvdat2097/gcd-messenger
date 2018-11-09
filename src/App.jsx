import React, { Component } from 'react';
import SockJS from 'sockjs-client';
import StompClient from 'stompjs';
import Request from 'request';
import './App.css';

import Messenger from './components/Messenger/Messenger';
import SidePanel from './components/SidePanel/SidePanel';
import { MockDB, Users, Chat } from './model/mockDB';

import { CONSTANTS } from './environments/constants';

class App extends Component {
  nNewMsg = 0;
  sock = null;
  stomp = null;

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
    this.connectToSocket();

    this.getMessages().then(
      (res) => {
        console.log('Recieved ======', res);
        this.setState({
          messages: JSON.parse(res)
        });
      }
    );

    // TODO: remove this
    setInterval(() => {
      Users.push(Users[Math.round(Math.random())]);
      MockDB.webSocket.next({
        action: MockDB.CONSTANTS.NEW_USR
      });
    }, 3000);
  }

  handleChangeUsername() {
    let username = 'Mikeross';
    // while (!username) {
    //   username = window.prompt('Enter username: ', 'Mikeross')
    // }
    console.log(`Current user: ${username}`);
    this.setState({
      username: username
    });
  }

  fetchMoreMessages(done) {
    this.nNewMsg += CONSTANTS.N_MESSAGES;

    this.getMessages().then(
      (res) => {
        this.setState({
          messages: JSON.parse(res)
        });

        done();
      }
    )
  }

  // Core methods
  connectToSocket() {
    this.sock = new SockJS(CONSTANTS.SOCKET_SERVER);
    console.log('Socket connecting...');


    this.stomp = StompClient.over(this.sock);
    this.stomp.connect({}, (frame) => {
      console.log('Connected: ' + frame);
      this.stomp.subscribe(CONSTANTS.ROOM_NAME, function (message) {
        console.log('Received: ' + message);
      });
    });

    // this.sock.onmessage = (packet) => {
    //   const noti = JSON.parse(packet.data);


    //   console.log(noti.action);
    // switch (noti.action) {
    //   case CONSTANTS.NEW_MSG:
    //     this.nNewMsg++;
    //     this.setState({
    //       messages: this.getMessages(), // TODO:  Get NEW messages only
    //     });
    //     break;

    //   case CONSTANTS.NEW_USR:
    //     this.setState({
    //       activeUsers: MockDB.GETActiveUsers()
    //     });
    //     break;

    //   default:
    //     break;
    // }
    // }
    // }
  }

  getMessages() {
    return new Promise((resolve, reject) => {
      Request({
        method: 'GET',
        uri: CONSTANTS.REST_SERVER,
      },
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res.body);
          }
        })
    })
    // return MockDB.GETMessages(CONSTANTS.N_MESSAGES + this.nNewMsg);
  }

  sendMessage(username, message) {
    return new Promise((resolve, reject) => {
      Request({
        method: 'POST',
        body: JSON.stringify({
          username,
          message
        }),
        uri: CONSTANTS.REST_SERVER,
      },
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res.body);
          }
        });
    });
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
