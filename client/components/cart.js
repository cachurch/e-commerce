import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {me} from '../store/user'
import './style/all-products.css'
import './style/cart-item-list.css'
import {
  fetchOrder,
  addOrderItem,
  incrementOrderItem,
  decrementOrderItem,
  deleteOrderItem,
  checkoutOrder
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

  render() {
    const user = this.props.user || {}
    const order = this.props.order.products || []
    const orderId = this.props.order.id || {}

    return (
      <div>
        <h1>Cart </h1>
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
                    this.props.incrementOrderItem(item.id, item)
                  }}
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => {
                    this.props.decrementOrderItem(item.id, item)
                  }}
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => {
                    this.props.deleteOrderItem(item.id, item)
                  }}
                >
                  DELETE
                </button>
              </div>
            </div>
          )
        })}

        {this.props.order.isComplete ? (
          'Thank You for Your Order!'
        ) : (
          <button
            type="button"
            onClick={() => {
              this.props.checkoutOrder(orderId)
            }}
          >
            CHECKOUT
          </button>
        )}
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
  addOrderItem: item => dispatch(addOrderItem(item)),
  incrementOrderItem: (id, item) => dispatch(incrementOrderItem(id, item)),
  decrementOrderItem: (id, item) => dispatch(decrementOrderItem(id, item)),
  deleteOrderItem: (id, item) => dispatch(deleteOrderItem(id, item)),
  checkoutOrder: id => dispatch(checkoutOrder(id))
})

export default connect(mapState, mapDispatch)(Cart)
