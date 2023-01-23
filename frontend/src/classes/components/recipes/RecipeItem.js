import React from "react";
import styles from "./RecipeItem.module.css";
import RecipeDetails from "./RecipeDetails";
import axios from 'axios';

class RecipeItem extends React.Component {
  state = {
    detailsDisplay: 'none'
  };

  constructor() {
    super();
    this.RecipeDetails1 = React.createRef();
  }

  getRecipeDetails = () => {
    const currentRecipeDetails = this.RecipeDetails1.current;
    const url = '/recipes/'+this.props.recipe.id;
    console.log('Getting recipe from ' + url);
    axios.get(url)
      .then(response => {
        currentRecipeDetails.updateDetails(response.data);
      })
  }

  toggleRecipeDetails = () => {
    this.getRecipeDetails();
    const currentDetailsDisplay = this.state.detailsDisplay;
    this.setState({
      detailsDisplay: currentDetailsDisplay ? null : 'none'
    })
  }

  render() {
    return (
      <li className={styles.item}>
        <div id={'recipe_'+this.props.recipe.id}>
          <span onClick={this.toggleRecipeDetails}>{this.props.recipe.name}</span>
          <RecipeDetails
            ref={this.RecipeDetails1}
            id={this.props.recipe.id}
            display={this.state.detailsDisplay}
          />
        </div>
      </li>
    )
  }
}

export default RecipeItem