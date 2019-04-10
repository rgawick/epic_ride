import React, { Component } from 'react';
import { connect } from 'react-redux'
import CheckoutArea from './CheckoutArea'
import cart from './images/cart.png'
import { Link } from 'react-router-dom';

export class Cart extends Component {

    constructor(props){
        super(props)
      }

  render() {
      let cartItems = this.props.cart.map((board,index) => {
        return  <div>
                <li key={index} className="cart_item">
               <h3>{board.content.name}</h3>
               <img className="cart_image" src={board.content.imageurl} />
               <button type="button" className="button" onClick={() => this.props.removeFromCart({board})}>Remove</button>
               <p className="price_in_cart">$ {board.content.price}</p>
               </li>
               </div>
      })

     return( 
        <div>
        <CheckoutArea />
        <img className="cart" src={cart} />
        <Link to="/checkout">
        <button type="button" className="checkout_button">Checkout</button>
        </Link>
        <li className="margin_top">Quantity: {this.props.cartCounter}</li>
        <li>Total: $ {this.props.totalPrice}</li>
        <li>{cartItems}</li>
        </div>)
    
  }
}

const mapStateToProps = (state) => {
    return {
      cart: state.cart,
      cartCounter: state.cartCounter,
      totalPrice: state.totalPrice
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      addToCart: (item) => {
        dispatch({type: "ADD", payload: item })
    },
    removeFromCart: (item) => {
      dispatch({type: "REMOVE", payload: item})
    },
    checkOut: () => {
        dispatch({type: "CHECKOUT"})
    }
  }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
