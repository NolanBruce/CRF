import React from "react"
import styles from "./IngredientItems.module.css"

class IngredientItems extends React.Component {

  render() {
    const { id, title } = this.props.ingredient;

    return (
      <li className={styles.item}>
        <div>
          <button onClick={() => this.props.deleteIngredientProps(id)}>Delete</button>
          <span>{title}</span>
        </div>
      </li>
    )
  }
}

export default IngredientItems