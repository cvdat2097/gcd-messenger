import React from 'react';
import './ActiveUsers.css';

import ContactBox from './ContactBox/ContactBox';

export default class ActiveUsers extends React.Component {

    generateContacts(users) {
        let result = [];

        users.forEach((user, index) => {
            result.push(
                <ContactBox 
                    key={index}
                    username={user.username}
                    avatar={user.avatar}
                />
            );
        });

        return result;
    }

    render() {
        return (
            <div id="contacts">
                {/* contact-status online busy away */}
                <div className="online-users">Online: {this.props.activeUsers.length}</div>
                <ul>
                    {this.generateContacts(this.props.activeUsers)}
                </ul>
            </div>
        );
    }
}