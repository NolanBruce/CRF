import React from "react";
import RecipesList from "./RecipesList";
import RecipesHeader from "./RecipesHeader";
import RecipeClear from "./RecipeClear";

class RecipesContainer extends React.Component {

  state = {
    recipes: [],
    display: 'none'
  };

  componentDidMount() {
    let temp = localStorage.getItem("recipes");
    let loadedRecipes = JSON.parse(temp);
    if (loadedRecipes) {
      this.setState({
        recipes: loadedRecipes
      });
      this.makeVisible();
    }
  }

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
      <div className="container" id="RecipesContainer" style={{display: this.state.display}}>
        <div className="inner">
          <RecipesHeader />
          <RecipesList
            recipes={this.state.recipes}
          />
          <RecipeClear
            clearRecipes={this.clearRecipes}
          />
        </div>
      </div>
    );
  }
}

export default RecipesContainer