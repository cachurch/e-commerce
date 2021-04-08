import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProduct} from '../store/product'
import {me} from '../store/user'
import EditProductForm from './edit-product-form'
import './style/single-product.css'
import {addToLocalStorage} from '../local-storage/local-storage'
import {fetchOrder, addOrderItem} from '../store'

export class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id)
    this.props.me()
    this.props.fetchOrder()
  }

  render() {
    const product = this.props.product || {}
    const user = this.props.user || {}

    function addToGuestCart() {
      if (user.id) {
        //{'do this'}
      } else {
        addToLocalStorage(product)
      }
    }

    return (
      <div>
        <div className="single-product">
          <img
            src={product.imageUrl}
            className="single-product-img"
            // width="800px"
          />
          <div className="single-product-info">
            <h3>{product.artist}</h3>
            <p>{product.title}</p>
            <p>${product.price}.00</p>
            {!user.id ? (
              <button type="button" onClick={addToGuestCart}>
                Add to Cart
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  this.props.addOrderItem(product)
                }}
              >
                Add to Cart
              </button>
            )}
            {user.isAdmin ? (
              <EditProductForm
                product={this.props.product}
                updateProduct={this.props.updateProduct}
                id={product.id}
              />
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {product: state.product, user: state.user, order: state.cart}
}

const mapDispatch = dispatch => ({
  fetchProduct: id => dispatch(fetchProduct(id)),
  me: () => dispatch(me()),
  fetchOrder: () => dispatch(fetchOrder()),
  addOrderItem: item => dispatch(addOrderItem(item))
})

export default connect(mapState, mapDispatch)(SingleProduct)
