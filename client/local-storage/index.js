const {default: product} = require('../store/product')

function addToLocalStorage(product) {
  //add to local storage
  let userCart
  let cart = {items: {}, total: 0}
  if (!localStorage.getItem('cart')) {
    // const cart = {items: {}, total: 0}
    cart.items[product.id] = {product, quantity: 1}
    localStorage.setItem('cart', JSON.stringify(cart))
    userCart = {}
  } else {
    cart = JSON.parse(localStorage.getItem('cart'))

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
  if (!localStorage.getItem('cart')) {
    //
  } else {
    const cart = JSON.parse(localStorage.getItem('cart'))
    delete cart.items[product.id]
    localStorage.setItem('cart', JSON.stringify(cart))

    return product.id
  }
}

function deleteCart() {
  if (!localStorage.getItem('cart')) {
    //
  } else {
    const cart = JSON.parse(localStorage.getItem('cart'))
    cart.items = {}
    cart.total = 0
    localStorage.setItem('cart', JSON.stringify(cart))
  }
}

function getCartFromLS() {
  let cart = {items: {}, total: 0}
  if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'))
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

//  {order.forEach(item => {
//   total += item.price
// })}
// Total Price: ${total}.00
