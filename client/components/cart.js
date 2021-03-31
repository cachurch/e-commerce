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
import {getCartFromLS} from '../local-storage/local-storage'

export class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  render() {
    const cartItems = getCartFromLS().items
    console.log(cartItems)
    let items = []
    for (let key in cartItems) {
      items.push(cartItems[key])
    }
    console.log('items: ', items)
    return (
      <div>
        <h1>Cart</h1>
        {items.map(item => {
          return (
            <div key={item.product.id}>
              <p>{item.product.artist}</p>
              <p>{item.product.title}</p>
              <img src={item.product.imageUrl} />
              <p>{item.product.price}</p>
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

const mapDispatch = dispatch => ({})

export default connect(mapState, mapDispatch)(Cart)
