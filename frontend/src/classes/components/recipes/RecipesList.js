import React from "react"
import RecipeItem from "./RecipeItem";

class RecipesList extends React.Component {
  render() {
    return (
    <div>
      <ul>
        {this.props.recipes.map(recipe => (
          <RecipeItem
            key={recipe.id}
            recipe={recipe}
          />
        ))}
      </ul>
    </div>
    )
  }
}

export default RecipesList