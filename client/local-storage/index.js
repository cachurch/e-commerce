//Add to thunk, (transform data for fetch cart here to be the same as in database), add user as an argument in the thunk, you have access to user at the highest level in redux.

const {default: product} = require('../store/product')

function addToLocalStorage(product) {
  //add to local storage
  console.log('hit the local storage function!')
  let userCart
  let cart = {items: {}, total: 0}
  if (!localStorage.getItem('cart')) {
    // const cart = {items: {}, total: 0}
    cart.items[product.id] = {product, quantity: 1}
    localStorage.setItem('cart', JSON.stringify(cart))
    userCart = {}
  } else {
    cart = JSON.parse(localStorage.getItem('cart'))
    // const products = []
    // for (let key in cart.items) {
    //   products.push({...cart.items[key], productId: key})
    // }
    const products = formatProducts(cart)
    userCart = {products}

    if (cart.items[product.id]) {
      cart.items[product.id].quantity++
    } else {
      cart.items[product.id] = {product, quantity: 1}
    }
    localStorage.setItem('cart', JSON.stringify(cart))
  }
  product.orderItem = {quantity: cart.items[product.id].quantity}
  return {userCart, newItem: product}
}

function removeFromLocalStorage(product) {
  console.log('hit the remove from local storage function')
  if (!localStorage.getItem('cart')) {
    //
  } else {
    const cart = JSON.parse(localStorage.getItem('cart'))
    const products = formatProducts(cart)

    if (cart.items[product.id]) {
      cart.items[product.id].quantity--
      if (cart.items[product.id].quantity < 1) {
        delete cart.items[product.id]
      }
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    product.orderItem = {quantity: cart.items[product.id].quantity}
    return {products, item: product}
  }
}
function deleteFromLocalStorage(product) {
  console.log('hit the delete from local storage function')
  if (!localStorage.getItem('cart')) {
    //
  } else {
    const cart = JSON.parse(localStorage.getItem('cart'))
    delete cart.items[product.id]
    localStorage.setItem('cart', JSON.stringify(cart))
  }
}

function deleteCart() {
  console.log('cart deleted')
  if (!localStorage.getItem('cart')) {
    //
  } else {
    const cart = JSON.parse(localStorage.getItem('cart'))
    cart.items = {}
    cart.total = 0
    localStorage.setItem('cart', JSON.stringify(cart))
  }
}

// function getCartFromLS() {
//   let cart = {items: {}, total: 0}
//   let items = []
//   let final = []

//   if (localStorage.getItem('cart')) {
//     cart = JSON.parse(localStorage.getItem('cart'))
//     // eslint-disable-next-line guard-for-in
//     for (let key in cart) {
//         items.push(Object.values(cart[key]))
//       }
//     for (let i = 0; i < items.length; i++) {
//         for(let j = 0; j < items[i].length; j++) {
//         items[i][j].product.orderItem = {quantity: items[i][j].quantity, productId: items[i][j].id}
//         final.push(items[i][j].product)
//             }
//       }

//   }
//   return {products: final}
// }
function getCartFromLS() {
  let cart = {items: {}, total: 0}
  let final = []
  if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'))
    // let items = cart.items
    // eslint-disable-next-line guard-for-in
    //   for (let key in items) {
    //     items[key].product.orderItem = {
    //       quantity: items[key].quantity,
    //       productId: items[key].product.id
    //     }
    //     final.push(items[key].product)
    //   }
    // }
  }
  const products = formatProducts(cart)
  return {products}
}

function formatProducts(cart) {
  let items = {...cart}.items
  let products = []
  // eslint-disable-next-line guard-for-in
  for (let key in items) {
    items[key].product.orderItem = {
      quantity: items[key].quantity,
      productId: items[key].product.id
    }
    products.push(items[key].product)
  }
  return products
}

module.exports = {
  addToLocalStorage,
  getCartFromLS,
  removeFromLocalStorage,
  deleteFromLocalStorage,
  deleteCart
}
