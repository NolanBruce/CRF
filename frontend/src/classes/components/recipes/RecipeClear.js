import React from "react"

class RecipeClear extends React.Component {

  render() {
    return (
      <div className="recipe-clear">
        <button className="recipe-clear-button" onClick={() => this.props.clearRecipes()}><span>Clear Recipes</span></button>
      </div>
    )
  }
}

export default RecipeClear