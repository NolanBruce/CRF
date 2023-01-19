import React, { Component } from "react";
import axios from 'axios';

class InputIngredient extends Component {
  state = {
    title: "",
    data: [],
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (e.target.value.length > 0) {
      const request_data = { ingredient: e.target.value};
      axios.post('/ingredients', request_data)
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

  handleSubmit = e => {
    e.preventDefault();
    this.addRequiredIngredient(this.state.title);
  };

  selectIngredient = (ingredientName) => {
    this.setState({
      title: ingredientName,
    });
    this.addRequiredIngredient(ingredientName);
  }

  addRequiredIngredient = (ingredientName) => {
    const validatedIngredientName = this.validateIngredient(ingredientName);
    if(validatedIngredientName) {
      this.props.addIngredientItem(validatedIngredientName);
      this.clearSearchTerm();
    } else {
      alert("Please enter a valid ingredient");
    }
  }

  validateIngredient = (ingredientName) => {
    const ingredientNameLower = ingredientName.toLowerCase()
    for (let i = 0; i < this.props.ingredients.length; i++) {
      if (this.props.ingredients[i].title.toLowerCase() === ingredientNameLower) {
        this.clearSearchTerm();
        return null;
      }
    }
    for (let i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].name.toLowerCase() === ingredientNameLower) {
        return this.state.data[i].name;
      }
    }
    alert(`No matching ingredient found: ${ingredientName}`);
    return null;
  }

  clearSearchTerm = () => {
    this.setState({
      title: "",
      data: [],
    });
  }

  onSearch = (searchTerm) => {
    this.setState({
      searchTerm: searchTerm
    });
  };

  render() {
    return (
    <div>
      <form onSubmit={this.handleSubmit} className="form-container">
        <input
          type="text"
          className="input-text"
          placeholder="Add Ingredient..."
          value={this.state.title}
          name="title"
          onChange={this.onChange}
        />
        <button className="input-submit">Submit</button>
      </form>
      <div className="dropdown">
          {this.state.data.map((item) => (
              <div
                onClick={() => this.selectIngredient(item.name)}
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

export default InputIngredient


