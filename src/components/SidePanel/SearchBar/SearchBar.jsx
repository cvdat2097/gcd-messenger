import React from 'react';
import { connect } from 'react-redux';
import Action from '../../../actions';
import './SearchBar.css';

const mapStateToProps = (state) => (state.sidebarReducer.SearchBar);
const mapDispathToProps = (dispatch) => ({ changeKeyword: dispatch });

class SearchBar extends React.Component {
    constructor(props) {
        super(props);


        this.handleKeywordChange = this.handleKeywordChange.bind(this);
    }

    handleKeywordChange(e) {
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
