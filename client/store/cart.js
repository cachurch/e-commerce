import axios from 'axios'

//ACTION CREATORS
const GOT_ORDER = 'GOT_ORDER'
const ADDED_ORDER_ITEM = 'ADDED_ORDER_ITEM'
const INCREMENTED_ORDER_ITEM = 'INCREMENTED_ORDER_ITEM'
const DELETED_ORDER_ITEM = 'DELETED_ORDER_ITEM'

//ACTION TYPES
const gotOrder = order => ({
  type: GOT_ORDER,
  order
})

const addedOrderItem = ({userCart, newItem}) => {
  console.log(userCart, newItem)
  return {
  type: ADDED_ORDER_ITEM,
  userCart, 
  newItem
}
}

const incrementedOrderItem = id => ({
  type: INCREMENTED_ORDER_ITEM,
  id
})

//INITIAL STATE
const initialState = {}

//THUNK CREATORS
export const fetchOrder = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cart')
    dispatch(gotOrder(data))
    console.log('hit the fetch order thunk!')
  } catch (error) {
    console.error(error)
  }
}

export const addOrderItem = (item) => async dispatch => {
  try {
    console.log('hit the add order thunk!')
    const {data} = await axios.post('/api/cart', item)
    dispatch(addedOrderItem(data))

  } catch (error) {
    console.error(error)
  }
}

export const incrementOrderItem = (id) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/cart/increment/${id}`)
    dispatch(incrementedOrderItem(data))
  } catch (error) {
    console.error(error)
  }
}

//REDUCER

export default function cart(state = initialState, action) {
  switch (action.type) {
    case GOT_ORDER:
      return action.order
   
      case ADDED_ORDER_ITEM:
        // const cart = action.userCart
        // const products = [...cart.products, action.newItem]
        return {
          ...action.userCart, 
          products: [...action.userCart.products, action.newItem]
        }
      case INCREMENTED_ORDER_ITEM: 
      return {
        ...state, 
      }
      default:
        return state
  }
}