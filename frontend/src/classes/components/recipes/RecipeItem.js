import React from "react"
import styles from "./RecipeItem.module.css"

class RecipeItem extends React.Component {

  render() {
    const { id, name } = this.props.recipe

    return (
      <li className={styles.item}>
        <div id={'recipe_'+id}>
          <span>{name}</span>
        </div>
      </li>
    )
  }
}

export default RecipeItem