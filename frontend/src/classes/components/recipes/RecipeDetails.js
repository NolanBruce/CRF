import React from "react"
import styles from "./RecipeDetails.module.css"
import RecipeIngredientItem from "./RecipeIngredientItem"

class RecipeDetails extends React.Component {
  state = {
    id: -1,
    name: '',
    shaken: false,
    stirred: false,
    rocks: false,
    glass: '',
    chilled: false,
    ice: '',
    doubleStrain: false,
    description: '',
    directions: '',
    notes: '',
    url: '',
    ingredients: []
  };

  updateDetails = (details) => {
    const currentRecipeDetails = this.state.details;
    if (currentRecipeDetails !== details) {
      this.setState({
        id: details.id,
        name: details.name,
        shaken: details.shaken,
        stirred: details.stirred,
        rocks: details.rocks,
        glass: details.glass,
        chilled: details.chilled,
        ice: details.ice,
        doubleStrain: details.double_strain,
        description: details.description,
        directions: details.directions,
        notes: details.notes,
        url: details.url,
        ingredients: details.ingredients
      });
    }
  }

  getBuildMethod = () => {
    if (this.state.shaken) {
      return "Shaken";
    } else if (this.state.stirred) {
      return "Stirred";
    }
    return "Built"
  }

  getRocks = () => {
    if (this.state.rocks) {
      return "On the Rocks";
    } else if (this.state.shaken || this.state.stirred) {
      return "Straight Up";
    }
    return "Neat"
  }

  getGlass = () => {
    const result = this.state.chilled ? 'Chilled ' : '';
    return result + this.state.glass
  }

  getABV = () => {
     let totalVolumeInOunces = 0;
     let totalABV = 0;
     for (let i=0; i<this.state.ingredients.length; i++) {
       const volumeInOunces = this.getVolumeInOunces(this.state.ingredients[i].quantity, this.state.ingredients[i].unit);
       totalVolumeInOunces += volumeInOunces;
       totalABV += (volumeInOunces * this.state.ingredients[i].abv);
     }
     if (!totalVolumeInOunces) {
       return 0;
     }
     return (Math.round((totalABV/totalVolumeInOunces)*2)/2).toFixed(1);
  }

  getVolumeInOunces = (quantity, unit) => {
    switch (unit) {
      case 'oz':
        return quantity;
      case 'tsp':
        return quantity/6;
      case 'tbsp':
        return quantity/2;
      default:
        break;
    }
    return 0
  }

  render() {
    return (
      <div id={'recipe_'+this.props.id+'_details'} style={{display: this.props.display}}>
        <div id={'recipe_'+this.props.id+'_grid'} className={styles.itemContainer}>
          <div id={'recipe_'+this.props.id+'_build-method'} className={styles.item}>{this.getBuildMethod()}</div>
          <div id={'recipe_'+this.props.id+'_ice'} className={styles.item}>{this.getRocks()}</div>
          <div id={'recipe_'+this.props.id+'_glass'} className={styles.item}>{this.getGlass()}</div>
          <div id={'recipe_'+this.props.id+'_abv'} className={styles.item}>{this.getABV() + '% ABV'}</div>
        </div>
        <ul className={styles.recipeIngredientsContainer}>
          {this.state.ingredients.map(ingredient => (
            <RecipeIngredientItem
              key={ingredient.id}
              ingredient={ingredient}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default RecipeDetails