import React from 'react';
import './SidePanel.css';

import Profile from './Profile/Profile';
import SearchBar from './SearchBar/SearchBar';
import ActiveUsers from './ActiveUsers/ActiveUsers';
import BottomBar from './BottomBar/BottomBar';

export default class SidePanel extends React.Component {
    render() {
        return (
            <div id="sidepanel">
                <Profile username={this.props.username}/>
                <SearchBar />
                <ActiveUsers />
                <BottomBar onChangeUsername={this.props.onChangeUsername}/>
            </div>
        );
    }
}
