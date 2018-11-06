import React from 'react';
import './SearchBar.css';

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            keyword: ''
        }

        this.handleKeywordChange = this.handleKeywordChange.bind(this);
    }

    handleKeywordChange(e) {
        this.setState({
            keyword: e.target.value
        });        
        this.props.onKeywordChange(e.target.value);
    }

    render() {
        return (
            <div id="search">
                <label htmlFor=""><i className="fa fa-search" aria-hidden="true"></i></label>
                <input type="text" placeholder="Search contacts..." 
                value={this.state.keyword}
                onChange={this.handleKeywordChange}
                />
            </div>
        );
    }
}
