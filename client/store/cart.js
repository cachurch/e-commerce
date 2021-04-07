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
  console.log('usercart: ', userCart, newItem)
  return {
  type: ADDED_ORDER_ITEM,
  userCart, 
  newItem
}
}

const incrementedOrderItem = (item) => {
  console.log('STORE ITEM: ', item)
  return {
  type: INCREMENTED_ORDER_ITEM,
  item
  }
}

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

//REDUCER

export default function cart(state = initialState, action) {
  switch (action.type) {
    case GOT_ORDER:
      return action.order
   
    case ADDED_ORDER_ITEM:
        // const cart = action.userCart
        // const products = [...cart.products, action.newItem]
        console.log('>>>>>>>>>>>', action.userCart)
      return {
          ...action.userCart, 
          products: [...action.userCart.products, action.newItem]
        }
    case INCREMENTED_ORDER_ITEM: 
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
      
      default:
        return state
  }
}

//the "id" on order items isn't included in the data sent because it isn't on the table? 