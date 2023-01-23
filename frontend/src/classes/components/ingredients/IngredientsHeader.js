import React from "react"

const IngredientsHeader = () => {

  const headerStyle = {
    padding: "20px 0",
    lineHeight: "1.5em",
  }

  return (
    <header style={headerStyle}>
      <h1 style={{ fontSize:"4rem", fontWeight:"600", marginBottom:"2rem", lineHeight:"1em", color:"#9a9a9a", textAlign:"center" }}>Cocktail Recipe Finder</h1>
    </header>
  )
}

export default IngredientsHeader