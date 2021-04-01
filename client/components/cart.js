import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  fetchProducts,
  fetchProduct,
  addProduct,
  deleteProduct
} from '../store/product'
import {me} from '../store/user'
import './style/all-products.css'
import './style/cart-item-list.css'
import {
  getCartFromLS,
  addToLocalStorage,
  removeFromLocalStorage
} from '../local-storage/local-storage'

export class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: getCartFromLS().items
    }
  }

  componentDidMount() {
    this.props.me()
  }

  //increase item in the cart
  increase(product, user) {
    if (user.id) {
      //{'do this'}
    } else {
      addToLocalStorage(product)
      this.setState({cart: getCartFromLS().items})
    }
  }
  //decrease item in the cart
  decrease(product, user) {
    console.dir(removeFromLocalStorage)
    if (user.id) {
      //{'do this'}
    } else {
      removeFromLocalStorage(product)
      this.setState({cart: getCartFromLS().items})
    }
  }
  render() {
    const user = this.props.user || {}
    //Pull in cart items from Local Storage & Change to an Array > Move this to the redux store
    const cartItems = getCartFromLS().items
    let items = []
    for (let key in this.state.cart) {
      items.push(this.state.cart[key])
    }

    return (
      <div>
        <h1>Cart</h1>
        {items.map(item => {
          return (
            <div className="cart-item-list" key={item.product.id}>
              <img src={item.product.imageUrl} />
              <div className="item-info">
                <p>{item.product.artist}</p>
              </div>
              <div className="item-info">
                <p>{item.product.title} </p>
              </div>
              <div className="item-info">
                <p>${item.product.price}.00 </p>
              </div>
              <div className="item-info">
                <button
                  type="button"
                  onClick={() => {
                    this.increase(item.product, user)
                  }}
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => {
                    this.decrease(item.product, user)
                  }}
                >
                  -
                </button>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {products: state.product.products, user: state.user}
}

const mapDispatch = dispatch => ({
  me: () => dispatch(me())
})

export default connect(mapState, mapDispatch)(Cart)
