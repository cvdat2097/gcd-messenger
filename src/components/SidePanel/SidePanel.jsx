import React from 'react';
import { connect } from 'react-redux';
import Action from '../../actions';
import './SidePanel.css';

import Profile from './Profile/Profile';
import SearchBar from './SearchBar/SearchBar';
import ActiveUsers from './ActiveUsers/ActiveUsers';
import BottomBar from './BottomBar/BottomBar';


const mapStateToProps = (state, ownProps) => {
    let currentKeyword = state.sidebarReducer.SidePanel.keyword

    return {
        keyword: currentKeyword,
        activeUsers: ownProps.activeUsers.filter((user) => {
            return user.username.toLowerCase().indexOf(currentKeyword) !== -1;
        })
    };
};

const mapDispatchToProps = (dispatch) => ({
    applyFilter: dispatch
});

class SidePanel extends React.Component {
    constructor(props) {
        super(props);

        this.handleKeywordChange = this.handleKeywordChange.bind(this);
    }

    handleKeywordChange(keyword) {
        this.props.applyFilter(Action.applyFilter(keyword));
    }

    render() {
        return (
            <div id="sidepanel">
                <Profile
                    username={this.props.username}
                    avatar={this.props.avatar}
                />
                <SearchBar
                    onKeywordChange={this.handleKeywordChange}
                />
                <ActiveUsers
                    activeUsers={this.props.activeUsers}
                />
                <BottomBar onChangeUsername={this.props.onChangeUsername} />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);
