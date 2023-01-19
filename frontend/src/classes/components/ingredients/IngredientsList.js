import React from "react"
import IngredientItem from "./IngredientItems";

class IngredientsList extends React.Component {
  render() {
    return (
    <div>
      <ul>
        {this.props.ingredients.map(ingredient => (
          <IngredientItem
            key={ingredient.id}
            ingredient={ingredient}
            deleteIngredientProps={this.props.deleteIngredientProps}
          />
        ))}
      </ul>
    </div>
    )
  }
}

export default IngredientsList