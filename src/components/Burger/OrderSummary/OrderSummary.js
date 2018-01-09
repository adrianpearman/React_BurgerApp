import React from 'react'
import Aux from '../../../HOC/Aux'
import Button from '../../../components/UI/Button/Button'

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
  .map(ingKey => {
    return(
      <li key={ingKey}>
        <span style={{textTransfrom: 'capitalize'}}>{ingKey}: </span>
        {props.ingredients[ingKey]}
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
      <p><b>Total Price: ${props.price.toFixed(2)}</b></p>
      <p>Continue to Checkout</p>
      <Button
        btnType='Danger'
        clicked={props.purchaseCanceled}>
        CANCEL
      </Button>
      <Button
        btnType='Success'
        clicked={props.purchaseContinue}>
        CONTINUE
      </Button>
    </Aux>
  )
}

export default orderSummary
