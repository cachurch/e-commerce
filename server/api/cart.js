const router = require('express').Router()
const {Product} = require('../db/models')
const {Order} = require('../db/models')
const {OrderItem} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    //Find an open cart for a logged in user
    if (req.user) {
      const userCart = await Order.findOne({
        where: {userId: req.user.id, isComplete: false},
        include: [{model: Product}]
      })
      //Send back cart data or a message that the cart is empty
      if (!userCart || userCart.products.length === 0) {
        res.send('Your Cart is Empty!')
      } else {
        res.json(userCart)
      }
    } else {
      //Find an open cart for a guest
      const guestCart = await Order.findOne({
        where: {id: req.session.order.id, isComplete: false},
        include: [{model: Product}]
      })
      //Send back cart data or a message that the cart is empty
      if (!guestCart || guestCart.products.length === 0) {
        res.send('Your Cart is Empty!')
      } else {
        res.json(guestCart)
      }
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body)
    if (req.user) req.user.id = 1
    else req.user = {id: 1}
    //finds or creates open carts for users
    if (req.user) {
      const userCart = await Order.findOrCreate({
        where: {userId: req.user.id, isComplete: false},
        include: [{model: Product}]
      })

      const newItem = await OrderItem.create({
        productId: req.body.productId,
        orderId: userCart[0].id
      })

      res.json({userCart, newItem})
    } else {
      //Creates a cart for guests > method needs to be updated to find or create
      const guestCart = await Order.findOrCreate({
        where: {id: req.session.order.id, isComplete: false},
        include: [{model: Product}]
      })
      //This sets the order id just created to the order id on the session
      req.session.order.id = guestCart.dataValues.id

      //Add OrderItem create() method here

      res.json(guestCart)
    }
  } catch (error) {
    next(error)
  }
})

// //--------------------Test if this works in guest cart post -------------------
// OrderItem.create({
//   where: {
//     productId: req.body.productId,
//     orderId: req.session.order.id
//   }})
// //----------------------------------------------------------
