import React from "react"

class IngredientsSearch extends React.Component {
  state = {
    display: 'none'
  };

  componentDidUpdate(prevProps) {
    if(prevProps.ingredients !== this.props.ingredients) {
      if (this.props.ingredients.length > 0) {
        this.makeVisible();
      } else {
        this.hideSearchButton();
      }
    }
  }

  makeVisible = () => {
    this.setState({
      display: null
    })
  }

  hideSearchButton = () => {
    this.setState({
      display: 'none'
    })
  }

  render() {
    return (
      <div className="ingredients-search" style={{display: this.state.display}}>
        <button className="ingredient-search-button" type="button" onClick={() => this.props.searchRecipes(this.props.ingredients)}><span>Search for Matching Ingredients</span></button>
      </div>
    )
  }
}

export default IngredientsSearch