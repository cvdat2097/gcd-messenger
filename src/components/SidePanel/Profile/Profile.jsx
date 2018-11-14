import React from 'react';
import './Profile.css';

export default class Profile extends React.Component {
    render() {
        return (
            <div id="profile">
                <div className="wrap">
                    <img id="profile-img" src={this.props.avatar || 'https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png'} className="online" alt="" />
                    <p>{this.props.username}</p>
                    <i className="fa fa-chevron-down expand-button" aria-hidden="true"></i>
                    <div id="status-options">
                        <ul>
                            <li id="status-online" className="active"><span className="status-circle"></span>
                                <p>Online</p>
                            </li>
                            <li id="status-away"><span className="status-circle"></span>
                                <p>Away</p>
                            </li>
                            <li id="status-busy"><span className="status-circle"></span>
                                <p>Busy</p>
                            </li>
                            <li id="status-offline"><span className="status-circle"></span>
                                <p>Offline</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}