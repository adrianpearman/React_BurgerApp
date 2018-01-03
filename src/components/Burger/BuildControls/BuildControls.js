import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
  { label: 'Salad', type: 'salad'},
  { label: 'Cheese', type: 'cheese'},
  { label: 'Bacon', type: 'bacon'},
  { label: 'Meat', type: 'meat'}
]

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p style={{textAlign: 'center'}}>Current Price: <b>${props.price.toFixed(2)}</b> </p>
      {controls.map((control) => {
        return(
          <BuildControl
            key={control.label}
            label={control.label}
            added={() => props.ingredientAdded(control.type)}
            removed={() => props.ingredientsRemoved(control.type)}
            disabled={props.disabled[control.type]}
          />
        )
      })}
      <button
        className={classes.OrderButton}
        disabled={!props.ableToPurchase}
        onClick={props.ordered}>
        ORDER NOW
      </button>
    </div>
  )
}

export default buildControls
