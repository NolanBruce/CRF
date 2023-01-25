import React, { Component } from "react";
import axios from 'axios';

class InputRecipe extends Component {
  state = {
    title: "",
    data: [],
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (e.target.value.length > 0) {
      const request_data = { recipe_name: e.target.value};
      axios.post('/recipes', request_data)
        .then(response => {
          this.setState({
            data: response.data    // TODO: Make dropdown data navigable with arrow keys (maybe move to new class)
          })
      });
    } else {
      this.setState({
        data: []
      })
    }
  }

  selectRecipe = (recipeName) => {
    this.searchRecipes(recipeName);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.searchRecipes(this.state.title);
  }

  searchRecipes = (name) => {
    this.props.searchRecipes(name);
    this.clearSearchTerm();
  }

  clearSearchTerm = () => {
    this.setState({
      title: "",
      data: [],
    });
  }

  render() {
    return (
    <div style={{display: this.props.enabled ? null : 'none'}}>
      <form onSubmit={this.handleSubmit} className="form-container">
        <input
          type="text"
          className="input-text"
          placeholder="Search for Recipes..."
          value={this.state.title}
          name="title"
          onChange={this.onChange}
        />
        <button className="input-submit">Submit</button>
      </form>
      <div className="dropdown">
          {this.state.data.map((item) => (
              <div
                onClick={() => this.selectRecipe(item.name)}
                className="dropdown-row"
                key={item.name}
              >
                {item.name}
              </div>
            ))}
        </div>
    </div>
    )
  }
}

export default InputRecipe


