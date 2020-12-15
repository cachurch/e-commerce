import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProduct} from '../store/product'
import './style/single-product.css'

export class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id)
  }

  render() {
    const product = this.props.product || {}
    // console.log('product: ', product)
    // console.log('state > ', this.state)
    // console.log('props > ', this.props)
    // console.log('params > ', this.props.params)

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
            <button type="button">Add to Cart</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {product: state.product}
}

const mapDispatch = dispatch => ({
  fetchProduct: id => dispatch(fetchProduct(id))
})

export default connect(mapState, mapDispatch)(SingleProduct)
