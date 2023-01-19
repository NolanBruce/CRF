import React from "react"
import IngredientsContainer from "./components/ingredients/IngredientsContainer";
import RecipesContainer from "./components/recipes/RecipesContainer";
import axios from 'axios';

class ParentContainer extends React.Component {
  constructor() {
    super();
    this.IngredientsContainer1 = React.createRef();
    this.RecipesContainer1 = React.createRef();
  }

  searchRecipes = (ingredientList) => {
    let ingredients = []
    for (let i = 0; i < ingredientList.length; i++) {
      ingredients.push(ingredientList[i].title);
    }
    const request_data = {ingredients: ingredients}
    axios.post('/recipes', request_data)
      .then(response => {
        const currentRecipesContainer = this.RecipesContainer1.current;
        currentRecipesContainer.receiveNewRecipes(response.data);
    })
    localStorage.getItem("recipes");
  }

  render() {
    return (
      <div>
        <IngredientsContainer
          ref={this.IngredientsContainer1}
          searchRecipes={this.searchRecipes}/>
        <RecipesContainer
          ref={this.RecipesContainer1}
        />
      </div>
    );
  }
}

export default ParentContainer