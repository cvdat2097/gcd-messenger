import React from 'react';
import { connect } from 'react-redux';
import Action from '../../../actions';
import './SearchBar.css';

const initialState = {
    keyword: ''
}

const mapStateToProps = (state) => ({ keyword: state.sidebarReducer.SearchBar.keyword });
const mapDispathToProps = (dispatch) => ({ changeKeyword: dispatch });

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        // this.state = initialState;

        this.handleKeywordChange = this.handleKeywordChange.bind(this);
    }

    handleKeywordChange(e) {
        // this.setState({
        //     keyword: e.target.value
        // });
        this.props.changeKeyword(Action.changeKeyword(e.target.value));
        this.props.onKeywordChange(e.target.value);
    }

    render() {
        return (
            <div id="search">
                <label htmlFor=""><i className="fa fa-search" aria-hidden="true"></i></label>
                <input type="text" placeholder="Search contacts..."
                    value={this.props.keyword}
                    onChange={this.handleKeywordChange}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispathToProps)(SearchBar);
