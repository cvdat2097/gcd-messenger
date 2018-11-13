import React from 'react';
import { connect } from 'react-redux';
import Action from '../../actions';
import './SidePanel.css';

import Profile from './Profile/Profile';
import SearchBar from './SearchBar/SearchBar';
import ActiveUsers from './ActiveUsers/ActiveUsers';
import BottomBar from './BottomBar/BottomBar';

// const initialState = {
//     activeUsers: null,
//     keyword: ''
// }

const mapStateToProps = (state) => state.sidebarReducer.SidePanel;
const mapDispatchToProps = (dispatch) => ({
    applyFilter: dispatch
});

class SidePanel extends React.Component {
    constructor(props) {
        super(props);

        // this.state = initialState;

        this.handleKeywordChange = this.handleKeywordChange.bind(this);
    }

    handleKeywordChange(keyword) {
        if (!keyword) {
            // this.setState({
            //     activeUsers: this.props.activeUsers,
            //     keyword: keyword
            // });
            this.props.applyFilter(Action.applyFilter(keyword, this.props.activeUsers));
        } else {
            // this.setState({
            //     activeUsers: this.props.activeUsers.filter((user) => {
            //         return user.username.toLowerCase().indexOf(keyword) !== -1;
            //     }),
            //     keyword: keyword
            // });
            this.props.applyFilter(Action.applyFilter(keyword, this.props.activeUsers.filter((user) => {
                return user.username.toLowerCase().indexOf(keyword) !== -1;
            })));

        }
    }

    componentWillMount() {
        // this.setState({
        //     activeUsers: this.props.activeUsers
        // });
        this.props.applyFilter(Action.applyFilter(undefined, this.props.activeUsers));
    }

    componentWillReceiveProps(newProps) {
        if (newProps.activeUsers.length !== this.props.activeUsers.length) {
            this.handleKeywordChange(this.props.keyword);
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
                    activeUsers={this.props.activeUsers}
                />
                <BottomBar onChangeUsername={this.props.onChangeUsername} />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);
