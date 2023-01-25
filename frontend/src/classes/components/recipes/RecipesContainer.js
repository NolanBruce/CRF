import React from "react";
import RecipesList from "./RecipesList";
import RecipesHeader from "./RecipesHeader";
import RecipeClear from "./RecipeClear";
import InputRecipe from "./InputRecipe";

class RecipesContainer extends React.Component {

  state = {
    recipes: [],
    display: 'none',
    ingredients: []
  };

  componentDidUpdate(prevProps, prevState) {
    if(prevState.recipes !== this.state.recipes) {
      const tmpRecipes = JSON.stringify(this.state.recipes)
      localStorage.setItem("recipes", tmpRecipes)
      if (this.state.recipes.length > 0) {
        this.makeVisible();
      } else {
        this.hideRecipes();
      }
    }
  }

  receiveNewRecipes = (newRecipes) => {
    this.setState({
      recipes: newRecipes
    })
  }

  clearRecipes = () => {
    this.setState({
      recipes: []
    })
  }

  makeVisible = () => {
    this.setState({
      display: null
    })
  }

  hideRecipes = () => {
    this.setState({
      display: 'none'
    })
  }

  render() {
    return (
      <div className="container" id="RecipesContainer">
        <div className="inner">
          <InputRecipe
            enabled={this.props.enabled}
            searchRecipes={this.props.searchRecipes}
          />
          <div style={{display: this.state.display}}>
            <RecipesHeader
              ingredients={this.state.ingredients}
            />
            <RecipesList
              recipes={this.state.recipes}
            />
            <RecipeClear
              clearRecipes={this.clearRecipes}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default RecipesContainer