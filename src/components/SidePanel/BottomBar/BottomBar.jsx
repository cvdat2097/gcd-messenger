import React from 'react';
import './BottomBar.css';

export default class BottomBar extends React.Component {
    render() {
        return (
            <div id="bottom-bar">
                <button id="addcontact"
                onClick={this.props.onChangeUsername}
                ><i className="fa fa-repeat fa-fw" aria-hidden="true"></i> <span>Login again</span></button>
                <button id="settings"><i className="fa fa-cog fa-fw" aria-hidden="true"></i> <span>Settings</span></button>
            </div>
        );
    }
}