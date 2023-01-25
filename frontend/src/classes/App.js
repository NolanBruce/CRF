import React from "react";
import IngredientsContainer from "./components/ingredients/IngredientsContainer";
import RecipesContainer from "./components/recipes/RecipesContainer";
import CRFHeader from "./components/CRFHeader";
import SearchToggle from "./components/SearchToggle";
import axios from 'axios';

class ParentContainer extends React.Component {
  state = {
    searchToggleChecked: false
  }

  componentDidMount() {
    let checked = localStorage.getItem("searchToggleChecked");
    if (checked !== null) {
      this.setState({
        searchToggleChecked: JSON.parse(checked)
      })
    }
  }

  constructor() {
    super();
    this.IngredientsContainer1 = React.createRef();
    this.RecipesContainer1 = React.createRef();
  }

  searchRecipesByIngredient = (ingredientList) => {
    let ingredients = [];
    for (let i = 0; i < ingredientList.length; i++) {
      ingredients.push(ingredientList[i].title);
    }
    const request_data = {ingredients: ingredients}
    axios.post('/recipes', request_data)
      .then(response => {
        const currentRecipesContainer = this.RecipesContainer1.current;
        currentRecipesContainer.receiveNewRecipes(response.data);
        currentRecipesContainer.setState({
          ingredients: ingredients
        })
    })
  }

  searchRecipesByName = (name) => {
    const request_data = {recipe_name: name}
    axios.post('/recipes', request_data)
      .then(response => {
        const currentRecipesContainer = this.RecipesContainer1.current;
        currentRecipesContainer.receiveNewRecipes(response.data);
        currentRecipesContainer.setState({
          ingredients: []
        })
    })
  }

  toggleSearchType = (checked) => {
    this.setState({
      searchToggleChecked: checked
    });
    localStorage.setItem("searchToggleChecked", checked);
  }

  render() {
    return (
      <div>
        <CRFHeader />
        <SearchToggle
          toggleSearchType={this.toggleSearchType}
          checked={this.state.searchToggleChecked}
        />
        <IngredientsContainer
          ref={this.IngredientsContainer1}
          searchRecipes={this.searchRecipesByIngredient}
          enabled={!this.state.searchToggleChecked}
        />
        <RecipesContainer
          ref={this.RecipesContainer1}
          enabled={this.state.searchToggleChecked}
          searchRecipes={this.searchRecipesByName}
        />
      </div>
    );
  }
}

export default ParentContainer