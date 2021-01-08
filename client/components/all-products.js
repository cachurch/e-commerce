import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts, fetchProduct, addProduct} from '../store/product'
import './style/all-products.css'
import Carousel from './hero-carousel'
import ProductForm from './product-form'

export class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const products = this.props.products || []
    // console.log(products)
    // console.log('state > ', this.state)
    // console.log('props > ', this.props)

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
              <br />
            </div>
          ))}
        </div>
        <div>
          <ProductForm addProduct={this.props.addProduct} />
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {products: state.product.products}
}

const mapDispatch = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
  fetchProduct: id => dispatch(fetchProduct(id)),
  addProduct: newProduct => dispatch(addProduct(newProduct))
})

export default connect(mapState, mapDispatch)(AllProducts)
