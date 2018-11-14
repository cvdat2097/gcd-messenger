import React from 'react';
import Action from '../../actions';
import { connect } from 'react-redux';
import './Messenger.css';

import MsgInput from './MsgInput/MsgInput';
import MsgBubble from './MsgBubble/MsgBubble';


const mapStateToProps = (state) => state.messengerReducer.Messenger;
const mapDispatchToProps = (dispatch) => ({ changeLoadingText: dispatch });

class Messenger extends React.Component {
    scrollDock;
    scrollLock = false;

    constructor(props) {
        super(props);


        this.generateBubbles = this.generateBubbles.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.fetchMoreMessages = this.fetchMoreMessages.bind(this);
    }

    scrollToBottom = () => {
        this.scrollDock.scrollIntoView({ behavior: "smooth" });
    }

    fetchMoreMessages() {
        this.scrollLock = true;
        this.props.changeLoadingText(Action.changeLoadingText('Loading...'));

        new Promise((resolve, reject) => {
            this.props.fetchMoreMessages(resolve);
        }).then(() => {
            // TODO: Fetch more message
            this.props.changeLoadingText(Action.changeLoadingText('More messages'));

            this.scrollLock = false;
        });
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentWillReceiveProps(newProps) {
        if (!this.scrollLock && newProps.messages.length !== this.props.messages.length) {
            this.scrollToBottom();
        }
    }

    generateBubbles(messages) {
        let result = [];

        messages.forEach((msg, index) => {
            result.push(
                <MsgBubble
                    key={index}
                    className={this.props.username === msg.user.username ? "internal" : "external"}
                    user={msg.user}
                    message={msg.message}
                    timeStamp={msg.message.timeStamp}
                />
            );
        });

        return result;
    }

    render() {
        return (
            <div className="content">
                <div className="messages">
                    <span style={{
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        display: 'block',
                        textAlign: 'center'
                    }}
                        onClick={this.fetchMoreMessages}
                    >{this.props.loadingText}</span>
                    <ul>
                        {this.generateBubbles(this.props.messages)}
                        <span id="scrollDock"
                            ref={(el) => { this.scrollDock = el; }}
                            style={{ 
                                visibility: 'hidden',
                                display: 'inline-block',
                                marginTop: 40
                            }}
                        >docker</span>
                    </ul>
                </div>
                <MsgInput
                    sendMessage={this.props.sendMessage}
                    username={this.props.username}
                    avatar={this.props.avatar}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messenger);
