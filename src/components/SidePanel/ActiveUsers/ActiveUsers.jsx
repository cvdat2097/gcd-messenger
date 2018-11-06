import React from 'react';
import './ActiveUsers.css';

import { Users } from '../../../model/mockDB';

export default class ActiveUsers extends React.Component {

    generateContacts(users) {
        let result = [];

        users.forEach((user, index) => {
            result.push(
                <li
                    key={index}
                    className="contact">
                    <div className="wrap">
                        <span className="contact-status online"></span>
                        <img src={user.avatar} alt={user.username} />
                        <div className="meta">
                            <p className="name">{user.username}</p>
                            <p className="preview">Recent message here</p>
                        </div>
                    </div>
                </li>
            );

        });

        return result;
    }

    render() {
        return (
            <div id="contacts">
                {/* contact-status online busy away */}
                <ul>
                    {this.generateContacts(Users)}
                </ul>
            </div>

        );
    }
}