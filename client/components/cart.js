import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {me} from '../store/user'
import './style/all-products.css'
import './style/cart-item-list.css'
import {
  getCartFromLS,
  addToLocalStorage,
  removeFromLocalStorage,
  deleteFromLocalStorage
} from '../local-storage/index'
import {
  fetchOrder,
  addOrderItem,
  incrementOrderItem,
  decrementOrderItem,
  deleteOrderItem
} from '../store'

export class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // cart: getCartFromLS().items
    }
  }

  componentDidMount() {
    // this.props.me()
    this.props.fetchOrder(this.props.user)
  }

  // //increase item in the cart
  // increase(product, user) {
  //   if (user.id) {
  //     //{'do this'}
  //   } else {
  //     addToLocalStorage(product)
  //     this.setState({cart: getCartFromLS().items})
  //   }
  // }
  // //decrease item in the cart
  // decrease(product, user) {
  //   console.dir(removeFromLocalStorage)
  //   if (user.id) {
  //     //{'do this'}
  //   } else {
  //     removeFromLocalStorage(product)
  //     this.setState({cart: getCartFromLS().items})
  //   }
  // }

  // delete(product) {
  //   deleteFromLocalStorage(product)
  //   this.setState({cart: getCartFromLS().items})
  // }

  render() {
    const user = this.props.user || {}
    const order = this.props.order.products || []
    // const orderItems = this.props.order.products || []

    console.log('react component order', order)
    // console.log('orderItems', orderItems)
    // console.log('hi i rendered')
    //Pull in cart items from Local Storage & Change to an Array > Move this to the redux store
    // const cartItems = getCartFromLS().items
    // let items = []
    // for (let key in this.state.cart) {
    //   items.push(this.state.cart[key])
    // }
    // console.log('items: ', items)

    return (
      <div>
        <h1>Cart</h1>
        {/* {!user.id
          ? items.map(item => {
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
                    <p>Qty: {item.quantity} </p>
                  </div>
                  <div className="item-info">
                    <p>${item.product.price}.00 </p>
                  </div>
                  <div className="item-info">
                    <button
                      type="button"
                      onClick={() => {
                        this.increase(item.product)
                      }}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        this.decrease(item.product)
                      }}
                    >
                      -
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        this.delete(item.product)
                      }}
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              )
            }) */}
        {/* : */}
        {order.map(item => {
          return (
            <div className="cart-item-list" key={item.id}>
              <img src={item.imageUrl} />
              <div className="item-info">
                <p>{item.artist}</p>
              </div>
              <div className="item-info">
                <p>{item.title} </p>
              </div>
              <div className="item-info">
                <p>Qty: {item.orderItem.quantity} </p>
              </div>
              <div className="item-info">
                <p>${item.price}.00 </p>
              </div>
              <div className="item-info">
                <button
                  type="button"
                  onClick={() => {
                    this.props.incrementOrderItem(item.id, user, item)
                  }}
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => {
                    this.props.decrementOrderItem(item.id, user, item)
                  }}
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => {
                    this.props.deleteOrderItem(item.id, user, item)
                  }}
                >
                  DELETE
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
  return {user: state.user, order: state.cart}
}

const mapDispatch = dispatch => ({
  me: () => dispatch(me()),
  fetchOrder: user => dispatch(fetchOrder(user)),
  addOrderItem: (item, user) => dispatch(addOrderItem(item, user)),
  incrementOrderItem: (id, user, item) =>
    dispatch(incrementOrderItem(id, user, item)),
  decrementOrderItem: (id, user, item) =>
    dispatch(decrementOrderItem(id, user, item)),
  deleteOrderItem: (id, user, item) => dispatch(deleteOrderItem(id, user, item))
})

export default connect(mapState, mapDispatch)(Cart)
