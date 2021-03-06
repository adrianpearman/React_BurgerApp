import React, { Component } from 'react'
import Aux from '../../HOC/Aux'
import Burger from '../../components/Burger/Burger'
import BurgerControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-order'
import withErrorHandler from '../../HOC/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'
// import axios from 'axios';


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
      ingredients: null,
      totalPrice: 4,
      ableToPurchase:false,
      purchasing: false,
      loading: false,
      error: false
    }
  }

componentDidMount(){
  axios.get('https://react-burger-app-5f83c.firebaseio.com/ingredients.json')
  .then(response => {
    this.setState({ingredients: response.data})
  })
  .catch(error => {
    this.setState({ error: true})
  })
}

updatePuchaseState(ingredients){
  const sum = Object.keys(ingredients)
    .map(ingKey => {
        return ingredients[ingKey]
    })
    .reduce((sum, el) => {
      return sum + el
    }, 0)
    this.setState({ableToPurchase: sum > 0})
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
    this.updatePuchaseState(updatedIngredients)
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
    this.updatePuchaseState(updatedIngredients)
  }

  purchaseHandler = () => {
    this.setState({purchasing: true})
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    // alert('You Continue!')
    this.setState({ loading: true})
    const order = {
      ingredients: this.state.ingredients,
      totalPrice: this.state.totalPrice,
      customer:{
        name: 'Adrian' ,
        address: {
          street: '123 Fake Street',
          town: 'Toronto',
          postalCode: 'M5B1B1'
        },
      email: 'adrian@adrian.com',
      orderMethod: 'fastest'}
    }

 axios.post('/orders.json', order)
    .then(response => {
      console.log(response)
      this.setState({loading: false, purchasing: false})
    })
    .catch(error => {
      console.log(error)
      this.setState({loading: false, purchasing: false})
    })
  }



  render(){
    const disableInfo = {
      ...this.state.ingredients
    }
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0
    }

    let orderSummary = null

    let burger = this.state.error? <p>Ingridients cant be loaded! </p> : <Spinner />
    if(this.state.ingredients){
      burger = (
          <Aux> 
            <Burger ingredients={this.state.ingredients}/>
              <BurgerControls
                price={this.state.totalPrice}
                ingredientAdded={this.addIngredientHandler}
                ingredientsRemoved={this.deleteIngredientHandler}
                disabled={disableInfo}
                ableToPurchase={this.state.ableToPurchase}
                ordered={this.purchaseHandler}
              />
          </Aux>
        )
      orderSummary = (
          <OrderSummary 
            ingredients={this.state.ingredients} 
            purchaseCanceled={this.purchaseCancelHandler} 
            purchaseContinue={this.purchaseContinueHandler} 
            price={this.state.totalPrice} />
          );
      }

          
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return(
      <Aux>
          <Modal
            show={this.state.purchasing}
            modalClosed={this.purchaseCancelHandler}
            >
            {orderSummary}
          </Modal>
          {burger}
      </Aux>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios)
