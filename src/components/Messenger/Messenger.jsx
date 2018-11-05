import React from 'react';
import './Messenger.css';
import { Chat } from '../../model/mockDB';

import MsgInput from './MsgInput/MsgInput';
import MsgBubble from './MsgBubble/MsgBubble';


export default class Messenger extends React.Component {
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
                    <ul>
                        {this.generateBubbles(Chat)}
                    </ul>
                </div>
                <MsgInput />
            </div>
        );
    }
}