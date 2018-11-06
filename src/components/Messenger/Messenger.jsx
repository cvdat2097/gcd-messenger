import React from 'react';
import './Messenger.css';

import MsgInput from './MsgInput/MsgInput';
import MsgBubble from './MsgBubble/MsgBubble';


export default class Messenger extends React.Component {
    scrollDock;

    constructor(props) {
        super(props);

        this.generateBubbles = this.generateBubbles.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    scrollToBottom = () => {
        this.scrollDock.scrollIntoView({ behavior: "smooth" });
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    generateBubbles(messages) {
        console.log(messages)
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
                    <ul>
                        {this.generateBubbles(this.props.messages)}
                        <span id="scrollDock"
                            ref={(el) => { this.scrollDock = el; }}
                            style={{visibility: 'hidden'}}
                        >dock</span>
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