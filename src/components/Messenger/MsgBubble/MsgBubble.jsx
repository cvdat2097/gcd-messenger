import React from 'react';
import './MsgBubble.css';

export default class MsgBubble extends React.Component {

    render() {
        return (
            <li className={this.props.className}>
                <img src={this.props.user.avatar} alt={this.props.user.username} />
                <p>{this.props.message.content}</p>
            </li>
        );
    }
}
