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

export class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>HELLO WORLD</h1>
      </div>
    )
  }
}

const mapState = state => {
  return {products: state.product.products, user: state.user}
}

const mapDispatch = dispatch => ({})

export default connect(mapState, mapDispatch)(Cart)
