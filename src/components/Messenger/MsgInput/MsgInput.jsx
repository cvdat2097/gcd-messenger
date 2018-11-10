import React from 'react';
import './MsgInput.css';

export default class MsgInput extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            message: ''
        }

        this.handleOnDataChange = this.handleOnDataChange.bind(this);
        this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
    }

    sendMessage() {
        this.props.sendMessage(this.props.username, this.state.message, this.props.avatar);
        this.setState({
            message: ''
        });
    }

    handleOnDataChange(e) {
        this.setState({
            message: e.target.value
        })
    }
    handleOnKeyPress(e) {
        if (e.keyCode === 13) {
            this.sendMessage();
        }
    }

    render() {
        return (
            <div className="message-input">
                <div className="wrap">
                    <input type="text" placeholder="Write your message..."
                        onChange={this.handleOnDataChange}
                        onKeyDown={this.handleOnKeyPress}
                        value={this.state.message} />
                    <i className="fa fa-paperclip attachment" aria-hidden="true"></i>
                    <button className="submit"
                        onClick={() => {
                            this.sendMessage();
                        }}
                    ><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
                </div>
            </div>
        );
    }
}