import React from 'react';
import './Messenger.css';

import MsgInput from './MsgInput/MsgInput';
import MsgBubble from './MsgBubble/MsgBubble';


export default class Messenger extends React.Component {
    scrollDock;
    scrollLock = false;

    constructor(props) {
        super(props);

        this.state = {
            loadingText: 'More messages',
        }

        this.generateBubbles = this.generateBubbles.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.fetchMoreMessages = this.fetchMoreMessages.bind(this);
    }

    scrollToBottom = () => {
        this.scrollDock.scrollIntoView({ behavior: "smooth" });
    }

    fetchMoreMessages() {
        this.scrollLock = true;
        this.setState({
            loadingText: 'Loading...',
        });

        new Promise((resolve, reject) => {
            this.props.fetchMoreMessages(resolve);
        }).then(() => {
            // TODO: Fetch more message
            this.setState({
                loadingText: 'More messages',
            });
            this.scrollLock = false;
        });
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        if (!this.scrollLock) {
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
                    >{this.state.loadingText}</span>
                    <ul>
                        {this.generateBubbles(this.props.messages)}
                        <span id="scrollDock"
                            ref={(el) => { this.scrollDock = el; }}
                            style={{ visibility: 'hidden' }}
                        >docker</span>
                    </ul>
                </div>
                <MsgInput
                    sendMessage={this.props.sendMessage}
                    username={this.props.username}
                />
            </div>
        );
    }
}