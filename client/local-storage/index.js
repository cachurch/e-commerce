//Add to thunk, (transform data for fetch cart here to be the same as in database), add user as an argument in the thunk, you have access to user at the highest level in redux.

function addToLocalStorage(product) {
  //add to local storage
  console.log('amogus')
  if (!localStorage.getItem('cart')) {
    const cart = {items: {}, total: 0}
    cart.items[product.id] = {product, quantity: 1}
    localStorage.setItem('cart', JSON.stringify(cart))
  } else {
    const cart = JSON.parse(localStorage.getItem('cart'))
    if (cart.items[product.id]) {
      cart.items[product.id].quantity++
    } else {
      cart.items[product.id] = {product, quantity: 1}
    }
    localStorage.setItem('cart', JSON.stringify(cart))
  }
}

function removeFromLocalStorage(product) {
  //add to local storage
  console.log('amogus')
  if (!localStorage.getItem('cart')) {
    //
  } else {
    const cart = JSON.parse(localStorage.getItem('cart'))
    if (cart.items[product.id]) {
      cart.items[product.id].quantity--
      if (cart.items[product.id].quantity < 1) {
        delete cart.items[product.id]
      }
    }
    localStorage.setItem('cart', JSON.stringify(cart))
  }
}

function deleteFromLocalStorage(product) {
  console.log('amogus delete')
  if (!localStorage.getItem('cart')) {
    //
  } else {
    const cart = JSON.parse(localStorage.getItem('cart'))
    delete cart.items[product.id]
    localStorage.setItem('cart', JSON.stringify(cart))
  }
}

function getCartFromLS() {
  let cart = {items: {}, total: 0}
  let final = []

  if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'))
    let items = cart.products
    // eslint-disable-next-line guard-for-in
    for (let key in items) {
      items[key].product.orderItem = {quantity: items[key].quantity}
      final.push(items[key].product)
    }
  }
  return {products: final}
}

// function getCartFromLS() {
//   let cart = {items: {}, total: 0}
//   let items = []
//   let cartItems = []
//   if (localStorage.getItem('cart')) {
//     cart = JSON.parse(localStorage.getItem('cart'))
//     for (let key in cart) {
//       items.push(cart[key])
//     }
//   }
//   console.log('local storage cart', items)
//     return cartItems
//   }

module.exports = {
  addToLocalStorage,
  getCartFromLS,
  removeFromLocalStorage,
  deleteFromLocalStorage
}
