import axios from 'axios'

//ACTION CREATORS
const GOT_PRODUCTS = 'GOT_PRODUCTS'
const GOT_PRODUCT = 'GOT_PRODUCT'
const ADDED_PRODUCT = 'ADDED_PRODUCT'
const UPDATED_PRODUCT = 'UPDATED_PRODUCT'
const DELETED_PRODUCT = 'DELETED_PRODUCT'

//ACTION TYPES
const gotProducts = products => ({
  type: GOT_PRODUCTS,
  products
})

const gotProduct = id => ({
  type: GOT_PRODUCT,
  id
})

const addedProduct = newProduct => ({
  type: ADDED_PRODUCT,
  newProduct
})

const updatedProduct = edits => ({
  type: UPDATED_PRODUCT,
  edits
})

const deletedProduct = id => ({
  type: DELETED_PRODUCT,
  id
})

//INITIAL STATE
const initialState = {
  products: [],
  product: {}
}

//THUNK CREATORS

export const fetchProducts = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(gotProducts(data))
  } catch (error) {
    console.error(error)
  }
}

export const fetchProduct = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch(gotProduct(data))
  } catch (error) {
    console.error(error)
  }
}

export const addProduct = newProduct => async dispatch => {
  try {
    const {data} = await axios.post('/api/products', newProduct)
    dispatch(addedProduct(data))
  } catch (error) {
    console.error(error)
  }
}

export const updateProduct = (id, edits) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/products/${id}`, edits)
    dispatch(updatedProduct(data))
  } catch (error) {
    console.error(error)
  }
}

export const deleteProduct = id => async dispatch => {
  try {
    await axios.delete(`/api/products/${id}`)
    dispatch(deletedProduct(id))
  } catch (error) {
    console.error(error)
  }
}

//REDUCER

export default function product(state = initialState, action) {
  switch (action.type) {
    case GOT_PRODUCTS:
      return {
        ...state,
        products: action.products
      }
    case GOT_PRODUCT:
      return action.id
    case ADDED_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.newProduct]
      }
    case UPDATED_PRODUCT:
      return action.edits
    case DELETED_PRODUCT:
      return {
        ...state,
        products: state.products.filter(deleted => deleted.id !== action.id)
      }
    default:
      return state
  }
}
