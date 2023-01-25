import React from "react";
import InputIngredient from "./InputIngredient";
import IngredientsList from "./IngredientsList";
import IngredientsSearch from "./IngredientsSearch";
import { v4 as uuidv4 } from "uuid";

class IngredientsContainer extends React.Component {

  state = {
    ingredients: []
  };

  componentDidMount() {
    let temp = localStorage.getItem("ingredients");
    let loadedIngredients = JSON.parse(temp);
    if (loadedIngredients) {
      this.setState({
        ingredients: loadedIngredients
      })
      if (loadedIngredients.length>0 && this.props.enabled) {
        this.props.searchRecipes(loadedIngredients);
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.ingredients !== this.state.ingredients) {
      const temp = JSON.stringify(this.state.ingredients);
      localStorage.setItem("ingredients", temp);
    }
  }

  delIngredient = id => {
    this.setState({
      ingredients: [
        ...this.state.ingredients.filter(ingredient => {
          return ingredient.id !== id;
        })
      ]
    });
  };

  addIngredientItem = title => {
    const newIngredient = {
      id: uuidv4(),
      title: title
    };
    this.setState({
      ingredients: [...this.state.ingredients, newIngredient]
    });
  };

  render() {
    return (
      <div className="container" id="IngredientsContainer"  style={{display: this.props.enabled ? null : 'none'}}>
        <div className="inner">
          <InputIngredient
            addIngredientItem={this.addIngredientItem}
            ingredients={this.state.ingredients}
          />
          <IngredientsList
            ingredients={this.state.ingredients}
            deleteIngredientProps={this.delIngredient}
          />
          <IngredientsSearch
            searchRecipes={this.props.searchRecipes}
            ingredients={this.state.ingredients}
          />
        </div>
      </div>
    );
  }
}

export default IngredientsContainer