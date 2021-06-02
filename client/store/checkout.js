import axios from 'axios'

//ACTION TYPES

const CHECKEDOUT = 'CHECKEDOUT'

//ACTION CREATORS - used to update state, goes to reducer to update via the dispatch (sending an obj)

const checkedOutOrder = order => {
  console.log('store: order', order)
  return {
    type: CHECKEDOUT,
    order
  }
}

//INITIAL STATE
const initialState = {}

//THUNK CREATORS

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

//REDUCER

export default function checkout(state = initialState, action) {
  switch (action.type) {
    case CHECKEDOUT:
      return {
        ...state,
        order: action.order
      }
    default:
      return state
  }
}
