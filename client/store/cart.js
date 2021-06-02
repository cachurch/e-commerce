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

const checkedOutOrder = order => {
  console.log('store: order', order)
  return {
    type: CHECKEDOUT,
    order
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
export const fetchOrder = () => async dispatch => {
  try {
    console.log('hit the fetch order thunk!')
    const user = await axios.get('/auth/me')
    if (user.data.id) {
      const {data} = await axios.get('/api/cart')
      // console.log('this data is from the backend')
      dispatch(gotOrder(data))
    } else {
      dispatch(gotOrder(getCartFromLS()))
      // console.log('this data is from the browser')
    }
  } catch (error) {
    console.error(error)
  }
}

export const addOrderItem = item => async dispatch => {
  try {
    const user = await axios.get('/auth/me')
    if (user.data.id) {
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

export const incrementOrderItem = (id, item) => async dispatch => {
  try {
    const user = await axios.get('/auth/me')
    console.log('THUNK: user.data.id', user)
    if (user.data.id) {
      console.log('hit the increment thunk!')
      const {data} = await axios.put(`/api/cart/increment/${id}`)
      dispatch(incrementedOrderItem(data))
    } else {
      console.log('hit the increment thunk!')
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

export const checkoutOrder = id => async dispatch => {
  try {
    console.log('id', id)
    const user = await axios.get('/auth/me')
    console.log('user', user)
    if (user.data.id) {
      console.log('checked out!')
      const {data} = await axios.put(`/api/cart/checkout/${id}`)
      dispatch(checkedOutOrder(data))
    } else {
      console.log('checkout guest user!')
      // console.log('thunk: item', item)
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
