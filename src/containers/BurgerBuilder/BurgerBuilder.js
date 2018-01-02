import React, { Component } from 'react'
import Aux from '../../HOC/Aux'
import Burger from '../../components/Burger/Burger'
import BurgerControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
  salad: 0.70,
  bacon: 0.80,
  cheese: 0.75,
  meat: 1.50
}

class BurgerBuilder extends Component {

  constructor(props){
    super(props);
    this.state = {
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
      },
      totalPrice: 4
    }
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    const updatedCount = oldCount + 1
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount
    const priceAddition = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice + priceAddition
    this.setState({
     totalPrice: newPrice,
     ingredients: updatedIngredients
    })
  }

  deleteIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    if (oldCount <= 0) {
      return
    }
    const updatedCount = oldCount - 1
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount
    const priceAddition = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice - priceAddition
    this.setState({
     totalPrice: newPrice,
     ingredients: updatedIngredients
    })
  }

  render(){
    const disableInfo = {
      ...this.state.ingredients
    }
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0
    }
    return(
      <Aux>
          <Burger ingredients={this.state.ingredients}/>
          <BurgerControls
            ingredientAdded={this.addIngredientHandler}
            ingredientsRemoved={this.deleteIngredientHandler}
            disabled={disableInfo}
          />
      </Aux>
    )
  }
}

export default BurgerBuilder
