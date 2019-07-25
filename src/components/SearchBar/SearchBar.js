import React, {Component} from 'react'
import FontAwesome from 'react-fontawesome'
import './SearchBar.css'

class SearchBar extends Component{
  state = {
    value: ''
  };
  
  timeout = null;
  
  render() {
    return (
      <div className="rmdb-searchbar">
        <div className="rmdb-searchbar-content">
          <FontAwesome className="rmdb-fa-search" name="search" size="2x"/>
          <input
            type="text"
            className="rmdb-searchbar-input"
            placeholder="Search key word"
            onChange={this.doSearch}
            value={this.state.value}
          />
        </div>
      </div>
    )
  }
  
  doSearch = (event) => {
    this.setState({value: event.target.value});
    clearTimeout(this.timeout);
    
    this.timeout = setTimeout(() => {
      this.props.callback(false, this.state.value)
    }, 500)
  }
}

export default SearchBar
