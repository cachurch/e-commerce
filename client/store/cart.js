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
const DELETED_ORDER_ITEM = 'DELETED_ORDER_ITEM'

//ACTION Creators - used to update state, goes to reducer to update via the dispatch (sending an obj)
const gotOrder = order => ({
  type: GOT_ORDER,
  order
})

const addedOrderItem = ({userCart, newItem}) => {
  console.log('usercart: ', userCart, newItem)
  return {
    type: ADDED_ORDER_ITEM,
    userCart,
    newItem
  }
}

const incrementedOrderItem = item => {
  console.log('store item: ', item)
  return {
    type: INCREMENTED_ORDER_ITEM,
    item
  }
}

const decrementedOrderItem = item => {
  console.log('action creator item: ', item)

  return {
    type: DECREMENTED_ORDER_ITEM,
    item
  }
}

const deletedOrderItem = id => {
  console.log('action creator id:', id)
  return {
    type: DELETED_ORDER_ITEM,
    id
  }
}

//INITIAL STATE
const initialState = {}

//THUNK CREATORS
export const fetchOrder = user => async dispatch => {
  try {
    console.log('hit the fetch order thunk!')
    if (user.id) {
      const {data} = await axios.get('/api/cart')
      dispatch(gotOrder(data))
    } else {
      dispatch(gotOrder(getCartFromLS()))
    }
  } catch (error) {
    console.error(error)
  }
}

export const addOrderItem = (item, user) => async dispatch => {
  try {
    if (user.id) {
      console.log('hit the add order thunk!')
      const {data} = await axios.post('/api/cart', item)
      dispatch(addedOrderItem(data))
    } else {
      console.log('hit the add order thunk!')
      dispatch(addedOrderItem(addToLocalStorage(item)))
    }
  } catch (error) {
    console.error(error)
  }
}

export const incrementOrderItem = (id, user, item) => async dispatch => {
  try {
    if (user.id) {
      console.log('hit the increment thunk!')
      const {data} = await axios.put(`/api/cart/increment/${id}`)
      dispatch(incrementedOrderItem(data))
    } else {
      dispatch(incrementedOrderItem(addToLocalStorage(item)))
    }
  } catch (error) {
    console.error(error)
  }
}

export const decrementOrderItem = (id, user, item) => async dispatch => {
  try {
    if (user.id) {
      console.log('hit the decrement thunk!')
      const {data} = await axios.put(`/api/cart/decrement/${id}`)
      dispatch(decrementedOrderItem(data))
    } else {
      console.log('hit the decrement thunk!')
      console.log('thunk: item', item)
      dispatch(decrementedOrderItem(removeFromLocalStorage(item)))
    }
  } catch (error) {
    console.error(error)
  }
}

export const deleteOrderItem = (id, user, item) => async dispatch => {
  try {
    if (user.id) {
      console.log('hit the delete thunk!')
      await axios.delete(`/api/cart/${id}`)
      dispatch(deletedOrderItem(id))
    } else {
      console.log('hit the delete thunk!')
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
    case DELETED_ORDER_ITEM:
      return {
        ...state,
        products: [...state.products.filter(item => item.id !== action.id)]
      }
    default:
      return state
  }
}
