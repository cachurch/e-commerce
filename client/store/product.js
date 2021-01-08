import axios from 'axios'

//ACTION CREATORS
const GOT_PRODUCTS = 'GOT_PRODUCTS'
const GOT_PRODUCT = 'GOT_PRODUCT'
const ADDED_PRODUCT = 'ADDED_PRODUCT'

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
    default:
      return state
  }
}
