import React from 'react';
import './MsgInput.css';
import { connect } from 'react-redux';
import Action from '../../../actions';

const mapStateToProps = (state) => (state.messengerReducer.MsgInput);

const mapDispatchToProps = (dispatch) => ({ changeInputValue: dispatch });


class MsgInput extends React.Component {
    constructor(props) {
        super(props);

        this.handleOnDataChange = this.handleOnDataChange.bind(this);
        this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
    }

    sendMessage() {
        if (this.props.message.length) {
            this.props.sendMessage(this.props.username, this.props.message, this.props.avatar);
            this.props.changeInputValue(Action.changeInput(''));
        }
    }

    handleOnDataChange(e) {
        this.props.changeInputValue(Action.changeInput(e.target.value));

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
                        value={this.props.message} />
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

export default connect(mapStateToProps, mapDispatchToProps)(MsgInput);
