import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateProduct} from '../store/product'

export class EditProductForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      artist: '',
      price: 0,
      imageUrl: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const edits = {
      title: this.state.title,
      artist: this.state.artist,
      price: this.state.price,
      imageUrl: this.state.imageUrl
    }

    this.props.updateProduct(this.props.id, edits)

    this.setState({
      title: '',
      artist: '',
      price: 0,
      imageUrl: ''
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Edit Artwork</h3>
        <label>
          Artist:
          <input
            type="text"
            name="artist"
            onChange={this.handleChange}
            value={this.state.artist}
          />
        </label>
        <label>
          Title:
          <input
            type="text"
            name="title"
            onChange={this.handleChange}
            value={this.state.title}
          />
        </label>
        <label>
          Price:
          <input
            type="integer"
            name="price"
            onChange={this.handleChange}
            value={this.state.price}
          />
        </label>
        <label>
          Image:
          <input
            type="text"
            name="imageUrl"
            onChange={this.handleChange}
            value={this.state.imageUrl}
          />
        </label>
        <button type="submit">Edit Artwork</button>
      </form>
    )
  }
}

const mapState = state => {
  return {product: state.product}
}
const mapDispatch = dispatch => ({
  updateProduct: (id, edits) => dispatch(updateProduct(id, edits))
})

export default connect(mapState, mapDispatch)(EditProductForm)
