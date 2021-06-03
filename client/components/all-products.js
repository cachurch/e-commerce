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
import Carousel from './hero-carousel'
import ProductForm from './product-form'
import {addOrderItem, incrementOrderItem, decrementOrderItem} from '../store'

export class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchProducts()
    this.props.me()
  }

  render() {
    const products = this.props.products || []
    const user = this.props.user || {}
    const item = this.props.products || []

    return (
      <div>
        <div className="carousel-container">
          <Carousel />
        </div>
        <div className="all-products">
          {products.map(product => (
            <div key={product.id}>
              <Link to={`products/${product.id}`}>
                <img src={product.imageUrl} className="product-img" />
              </Link>
              {user.isAdmin ? (
                <div>
                  <button type="submit">
                    <Link to={`products/${product.id}`}>Edit Artwork</Link>
                  </button>
                  <button
                    type="submit"
                    onClick={() => this.props.deleteProduct(product.id)}
                  >
                    Delete
                  </button>
                  <br />
                  <button
                    type="button"
                    onClick={() => {
                      this.props.addOrderItem(product)
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      this.props.incrementOrderItem(product.id, user, item)
                    }}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      this.props.decrementOrderItem(product.id)
                    }}
                  >
                    -
                  </button>
                </div>
              ) : (
                <div className="addToCartButtons">
                  <button
                    type="button"
                    onClick={() => {
                      this.props.addOrderItem(product)
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      this.props.incrementOrderItem(product.id, user, item)
                    }}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      this.props.decrementOrderItem(product.id)
                    }}
                  >
                    -
                  </button>
                </div>
              )}
              <br />
            </div>
          ))}
        </div>
        <div>
          {user.isAdmin ? (
            <ProductForm addProduct={this.props.addProduct} />
          ) : (
            ''
          )}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {products: state.product.products, user: state.user}
}

const mapDispatch = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
  fetchProduct: id => dispatch(fetchProduct(id)),
  addProduct: newProduct => dispatch(addProduct(newProduct)),
  deleteProduct: id => dispatch(deleteProduct(id)),
  me: () => dispatch(me()),
  addOrderItem: item => dispatch(addOrderItem(item)),
  incrementOrderItem: (id, user, item) =>
    dispatch(incrementOrderItem(id, user, item)),
  decrementOrderItem: id => dispatch(decrementOrderItem(id))
})

export default connect(mapState, mapDispatch)(AllProducts)
