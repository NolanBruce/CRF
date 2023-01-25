import React from "react";

class SearchToggle extends React.Component {
  onChange = () => {
    const newCheckState = !this.props.checked
    this.props.toggleSearchType(newCheckState);
  }

  render() {
    return (
      <div className="container">
        <div className="toggle-div">
          <label className="toggle-label"> {this.props.checked? 'Search for recipes by name' : 'Add ingredients to find matching recipes'}</label>
          <label className="switch">
            <input type="checkbox" name="search-type-toggle" onChange={this.onChange} checked={this.props.checked}/>
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    );
  }
}

export default SearchToggle