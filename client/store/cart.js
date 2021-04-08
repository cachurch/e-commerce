import axios from 'axios'

//ACTION CREATORS
const GOT_ORDER = 'GOT_ORDER'
const ADDED_ORDER_ITEM = 'ADDED_ORDER_ITEM'
const INCREMENTED_ORDER_ITEM = 'INCREMENTED_ORDER_ITEM'
const DECREMENTED_ORDER_ITEM = 'DECREMENTED_ORDER_ITEM'
const DELETED_ORDER_ITEM = 'DELETED_ORDER_ITEM'

//ACTION TYPES
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

const incrementedOrderItem = (item) => {
  // console.log('STORE ITEM: ', item)
  return {
  type: INCREMENTED_ORDER_ITEM,
  item
  }
}

const decrementedOrderItem = (item) => {
  return {
    type: DECREMENTED_ORDER_ITEM,
    item
  }
}

const deletedOrderItem = (id) => ({
  type: DELETED_ORDER_ITEM,
  id
})

//INITIAL STATE
const initialState = {}

//THUNK CREATORS
export const fetchOrder = () => async dispatch => {
  try {
    // console.log('hit the fetch order thunk!')
    const {data} = await axios.get('/api/cart')
    dispatch(gotOrder(data))
  } catch (error) {
    console.error(error)
  }
}

export const addOrderItem = (item) => async dispatch => {
  try {
    // console.log('hit the add order thunk!')
    const {data} = await axios.post('/api/cart', item)
    dispatch(addedOrderItem(data))

  } catch (error) {
    console.error(error)
  }
}

export const incrementOrderItem = (id) => async dispatch => {
  try {
    console.log('hit the increment thunk!')
    const {data} = await axios.put(`/api/cart/increment/${id}`)
    dispatch(incrementedOrderItem(data))
  } catch (error) {
    console.error(error)
  }
}

export const decrementOrderItem = (id) => async dispatch => {
  try {
    console.log('hit the decrement thunk!')
    const {data} = await axios.put(`/api/cart/decrement/${id}`)
    dispatch(decrementedOrderItem(data))
  } catch (error) {
    console.error(error)
  }
}

export const deleteOrderItem = (id) => async dispatch => {
  try {
    console.log('hit the delete thunk!')
    await axios.delete(`/api/cart/${id}`)
    dispatch(deletedOrderItem(id))
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
        ...state, products: [
          //follow up: I feel like i don't totally get how spreading works why did I need to spread this?
          ...state.products.map(item => {
            if (item.id !== action.item.productId) {
              return item
            } else {
              return {
                ...item, orderItem: action.item
              }
            }
            
            })
        ]
      }
      case DECREMENTED_ORDER_ITEM:
        return {
          ...state, products: [
            ...state.products.map(item => {
              if (item.id !== action.item.productId) {
                return item
              } else {
                return {
                  ...item, orderItem: action.item
                }
              }

            })
          ]
        }
      case DELETED_ORDER_ITEM:
        return {
          ...state, products: [
            ...state.products.filter(item =>
              item.id !== action.id)
          ]
        }
      default:
        return state
  }
}

//the "id" on order items isn't included in the data sent because it isn't on the table? 