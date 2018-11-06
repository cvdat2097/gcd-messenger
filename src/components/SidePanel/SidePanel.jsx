import React from 'react';
import './SidePanel.css';

import Profile from './Profile/Profile';
import SearchBar from './SearchBar/SearchBar';
import ActiveUsers from './ActiveUsers/ActiveUsers';
import BottomBar from './BottomBar/BottomBar';

export default class SidePanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeUsers: props.activeUsers,
            keyword: ''
        }

        this.handleKeywordChange = this.handleKeywordChange.bind(this);
    }

    handleKeywordChange(keyword) {
        if (!keyword) {
            this.setState({
                activeUsers: this.props.activeUsers,
                keyword: keyword
            });
        } else {
            this.setState({
                activeUsers: this.props.activeUsers.filter((user) => {
                    return user.username.toLowerCase().indexOf(keyword) !== -1;
                }),
                keyword: keyword
            })
        }
    }
    componentWillReceiveProps(newProps) {
        if (newProps.activeUsers.length !== this.state.activeUsers.length) {
            this.handleKeywordChange(this.state.keyword);
        }
    }

    render() {
        return (
            <div id="sidepanel">
                <Profile username={this.props.username} />
                <SearchBar
                    onKeywordChange={this.handleKeywordChange}
                />
                <ActiveUsers
                    activeUsers={this.state.activeUsers}
                />
                <BottomBar onChangeUsername={this.props.onChangeUsername} />
            </div>
        );
    }
}
