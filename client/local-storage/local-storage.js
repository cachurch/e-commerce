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

function getCartFromLS() {
  let cart = {items: {}, total: 0}
  if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'))
  }
  return cart
}

module.exports = {addToLocalStorage, getCartFromLS, removeFromLocalStorage}
