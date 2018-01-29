import React, { Component } from 'react'
import Aux from '../../../HOC/Aux'
import Button from '../../../components/UI/Button/Button'

class OrderSummary extends Component {
  // this component could be functional. doesn't have to be class based
  componentWillUpdate(){
    console.log('[Order Summary] Will Update')
  }

  render(){
    const ingredientSummary = Object.keys(this.props.ingredients).map(ingKey => {
    return(
      <li key={ingKey}>
        <span style={{textTransfrom: 'capitalize'}}>{ingKey}: </span>
        {this.props.ingredients[ingKey]}
      </li>
    )
  })

  return(
    <Aux>
      <h3>Your Order</h3>
      <p>
        A delicious burger with the following toppings
      </p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><b>Total Price: ${this.props.price.toFixed(2)}</b></p>
      <p>Continue to Checkout</p>
      <Button
        btnType='Danger'
        clicked={this.props.purchaseCanceled}>
        CANCEL
      </Button>
      <Button
        btnType='Success'
        clicked={this.props.purchaseContinue}>
        CONTINUE
      </Button>
    </Aux>
  )
}
}

export default OrderSummary
