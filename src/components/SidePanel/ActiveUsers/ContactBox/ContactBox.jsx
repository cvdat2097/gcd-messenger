import React from 'react';
import './ContactBox.css';

export default class ContactBox extends React.Component {
    render() {
        return (
            <li
                className="contact">
                <div className="wrap">
                    <span className="contact-status online"></span>
                    <img src={this.props.avatar} alt={this.props.username} />
                    <div className="meta">
                        <p className="name">{this.props.username}</p>
                    </div>
                </div>
            </li>
        );
    }
}