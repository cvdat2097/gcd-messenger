import React, { Component } from 'react';
import SockJS from 'sockjs-client';
import StompClient from 'stompjs';
import Request from 'request';
import Moment from 'moment';
import './App.css';

import Messenger from './components/Messenger/Messenger';
import SidePanel from './components/SidePanel/SidePanel';

import { CONSTANTS } from './environments/constants';

class App extends Component {
  nNewMsg = CONSTANTS.N_MESSAGES;
  sock = null;
  stomp = null;

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      avatar: '',
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

    this.getMessages(this.nNewMsg).then(
      (res) => {
        console.log('Recieved ======', res);
        this.setState({
          messages: JSON.parse(res)
        });
      }
    );
  }

  handleChangeUsername() {
    let username = 'cvdat2097';
    let avatar = 'https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg';
    // let username = '';
    // let avatar = '';
    // while (!username) {
    //   username = window.prompt('Enter username: ', 'cvdat2097')
    // }
    // while (!avatar) {
    //   avatar = window.prompt('Enter avatar URL: ', 'https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg')
    // }
    console.log(`Current user: ${username}`);
    this.setState({
      username,
      avatar
    });
  }

  fetchMoreMessages(done) {
    this.nNewMsg += CONSTANTS.N_MESSAGES;

    this.getMessages(this.nNewMsg).then(
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
      // Add new user to database
      // Request({
      //   method: 'POST',
      //   body: JSON.stringify({
      //     username: this.state.username,
      //     avatar: this.state.avatar
      //   }),
      //   uri: CONSTANTS.REST_SERVER,
      // },
      //   (err, res) => {
      //     if (err) {
      //       console.log(err);
      //     } else {
      //       this.stomp.send(CONSTANTS.MSG_POINT, {}, CONSTANTS.NEW_USR);
      //     }
      //   }
      // );

      this.getActiveUsers().then(
        (users) => {
          this.setState({
            activeUsers: users
          })
        }
      );

      this.stomp.subscribe(CONSTANTS.ROOM_NAME, (noti) => {

        const notification = JSON.parse(noti.body);

        switch (notification.action) {
          case CONSTANTS.NEW_MSG:
            this.nNewMsg++;
            this.getMessages(this.nNewMsg).then(
              (res) => {
                this.setState({
                  messages: JSON.parse(res)
                });
              }
            );
            break;

          case CONSTANTS.NEW_USR:
            this.getActiveUsers().then(
              (users) => {
                this.setState({
                  activeUsers: users
                });
              }
            );
            break;

          default:

        }
      });
    });
  }

  getMessages(nMsg) {
    return new Promise((resolve, reject) => {
      Request({
        method: 'GET',
        uri: CONSTANTS.REST_SERVER,
        qs: {
          nmsg: nMsg
        }
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

  sendMessage(username, content, avatar) {
    return new Promise((resolve, reject) => {
      Request({
        method: 'POST',
        body: JSON.stringify({
          user: {
            username,
            avatar
          },
          message: {
            content,
            timeStamp: Moment().format(CONSTANTS.DATE_FORMAT).toString()
          }
        }),
        uri: CONSTANTS.REST_SERVER,
      },
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res.body);
            this.stomp.send(CONSTANTS.MSG_POINT, {}, CONSTANTS.NEW_MSG);
          }
        });
    });
  }

  getActiveUsers() {
    return new Promise((resolve, reject) => {
      Request({
        method: 'GET',
        uri: CONSTANTS.REST_SERVER + '/user',
      },
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            let users = JSON.parse(res.body);
            // users = users.filter((user) => {
            //   return user.username !== this.state.username;
            // });
            resolve(users.reverse());
          }
        })
    })
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
          avatar={this.state.avatar}
          sendMessage={this.sendMessage}
          messages={this.state.messages}
          fetchMoreMessages={this.fetchMoreMessages}
        />
      </div>
    );
  }
}

export default App;
