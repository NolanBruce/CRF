import React from "react"
import styles from "./RecipeDetails.module.css"

class RecipeIngredientItem extends React.Component {

  getIngredientAsText = () => {
    const name = this.props.ingredient.name;
    const quantity = this.props.ingredient.quantity;
    const unit = this.props.ingredient.unit;
    const garnish = this.props.ingredient.garnish;
    if (garnish) {
      return quantity + " " + name + " " + unit + " (garnish)";
    }
    return quantity + " " + unit + " " + name;
  }

  render() {
    const { id, name, quantity, unit, garnish } = this.props.ingredient;

    return (
      <li className={styles.ingredient}>
        <span>{this.getIngredientAsText()}</span>
      </li>
    )
  }
}

export default RecipeIngredientItem