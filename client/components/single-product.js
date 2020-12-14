import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts, fetchProduct} from '../store/product'
import './style/single-products.css'

export class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchProduct()
  }

  render() {
    const products = this.props.products || []
    console.log(products)
    console.log('state > ', this.state)
    console.log('props > ', this.props)

    return (
      <div>
        <div className="all-products">
          {products.map(product => (
            <div key={product.id}>
              <Link to={`products/${product.id}`}>
                <img src={product.imageUrl} className="product-img" width="" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {products: state.product.products}
}

const mapDispatch = dispatch => ({
  fetchProduct: id => dispatch(fetchProduct(id))
})

export default connect(mapState, mapDispatch)(SingleProduct)
