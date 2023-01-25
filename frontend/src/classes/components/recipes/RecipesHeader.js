import React from "react"

class RecipesHeader extends React.Component {

  getIndgredientListDisplay = () => {
    if (this.props.ingredients.length > 0) {
      return 'Contains: ' + this.props.ingredients.map(ingredient => ingredient).join(', ');
    }
    return '';
  }

  render() {
    const headerStyle = {
      padding: "20px 0",
      lineHeight: "1.5em",
    }

    return (
      <header style={headerStyle}>
        <h1 style={{fontSize:"2rem", fontWeight:"600", lineHeight:"1em", color:"black"}}>Matching Recipes</h1>
        <span>{this.getIndgredientListDisplay()}</span>
      </header>
    )
  }
}

export default RecipesHeader