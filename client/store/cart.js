import axios from 'axios'
import {
  addToLocalStorage,
  getCartFromLS,
  removeFromLocalStorage,
  deleteFromLocalStorage
} from '../local-storage/index'

//ACTION TYPES
const GOT_ORDER = 'GOT_ORDER'
const ADDED_ORDER_ITEM = 'ADDED_ORDER_ITEM'
const INCREMENTED_ORDER_ITEM = 'INCREMENTED_ORDER_ITEM'
const DECREMENTED_ORDER_ITEM = 'DECREMENTED_ORDER_ITEM'
const CHECKEDOUT = 'CHECKEDOUT'
const DELETED_ORDER_ITEM = 'DELETED_ORDER_ITEM'

//ACTION Creators - used to update state, goes to reducer to update via the dispatch (sending an obj)
const gotOrder = order => ({
  type: GOT_ORDER,
  order
})

const addedOrderItem = ({userCart, newItem}) => {
  return {
    type: ADDED_ORDER_ITEM,
    userCart,
    newItem
  }
}

const incrementedOrderItem = item => {
  return {
    type: INCREMENTED_ORDER_ITEM,
    item
  }
}

const decrementedOrderItem = item => {
  return {
    type: DECREMENTED_ORDER_ITEM,
    item
  }
}

const checkedOutOrder = order => {
  return {
    type: CHECKEDOUT,
    order
  }
}

const deletedOrderItem = id => {
  return {
    type: DELETED_ORDER_ITEM,
    id
  }
}

//INITIAL STATE
const initialState = {}

//THUNK CREATORS
export const fetchOrder = () => async dispatch => {
  try {
    const user = await axios.get('/auth/me')
    if (user.data.id) {
      const {data} = await axios.get('/api/cart')
      dispatch(gotOrder(data))
    } else {
      dispatch(gotOrder(getCartFromLS()))
    }
  } catch (error) {
    console.error(error)
  }
}

export const addOrderItem = item => async dispatch => {
  try {
    const user = await axios.get('/auth/me')
    if (user.data.id) {
      const {data} = await axios.post('/api/cart', item)
      dispatch(addedOrderItem(data))
    } else {
      dispatch(addedOrderItem(addToLocalStorage(item)))
    }
  } catch (error) {
    console.error(error)
  }
}

export const incrementOrderItem = (id, item) => async dispatch => {
  try {
    const user = await axios.get('/auth/me')
    if (user.data.id) {
      const {data} = await axios.put(`/api/cart/increment/${id}`)
      dispatch(incrementedOrderItem(data))
    } else {
      dispatch(incrementedOrderItem(addToLocalStorage(item)))
    }
  } catch (error) {
    console.error(error)
  }
}

export const decrementOrderItem = (id, item) => async dispatch => {
  try {
    const user = await axios.get('/auth/me')
    if (user.data.id) {
      const {data} = await axios.put(`/api/cart/decrement/${id}`)
      dispatch(decrementedOrderItem(data))
    } else {
      dispatch(decrementedOrderItem(removeFromLocalStorage(item)))
    }
  } catch (error) {
    console.error(error)
  }
}

export const checkoutOrder = id => async dispatch => {
  try {
    const user = await axios.get('/auth/me')
    if (user.data.id) {
      const {data} = await axios.put(`/api/cart/checkout/${id}`)
      dispatch(checkedOutOrder(data))
    } else {
      console.log('checkout guest user!')
      // dispatch(decrementedOrderItem(removeFromLocalStorage(item)))
    }
  } catch (error) {
    console.error(error)
  }
}

export const deleteOrderItem = (id, item) => async dispatch => {
  try {
    const user = await axios.get('/auth/me')
    if (user.data.id) {
      await axios.delete(`/api/cart/${id}`)
      dispatch(deletedOrderItem(id))
    } else {
      dispatch(deletedOrderItem(deleteFromLocalStorage(item)))
    }
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
      return {
        ...action.userCart,
        products: [...action.userCart.products, action.newItem]
      }
    case INCREMENTED_ORDER_ITEM:
      return {
        ...state,
        products: [
          ...state.products.map(item => {
            if (item.id !== action.item.productId) {
              return item
            } else {
              return {
                ...item,
                orderItem: action.item
              }
            }
          })
        ]
      }
    case DECREMENTED_ORDER_ITEM:
      return {
        ...state,
        products: [
          ...state.products.map(item => {
            if (item.id !== action.item.productId) {
              return item
            } else {
              return {
                ...item,
                orderItem: action.item
              }
            }
          })
        ]
      }
    case CHECKEDOUT:
      return action.order
    case DELETED_ORDER_ITEM:
      return {
        ...state,
        products: [...state.products.filter(item => item.id !== action.id)]
      }
    default:
      return state
  }
}
