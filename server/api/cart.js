const router = require('express').Router()
const {Product} = require('../db/models')
const {Order} = require('../db/models')
const {OrderItem} = require('../db/models')
module.exports = router

// const isLoggedIn = (req, res, next) => {
//   let user
//   if (!req.user) {
//     user = {}
//   } else {
//     user = req.user.dataVales
//   }
// }

// router.get('/:id', isLoggedIn, async (req, res, next) => {
//   try {
//     const cart = await OrderItem.findAll({where: {orderId: req.params.id}})
//     res.json(cart)
//   } catch (error) {
//     next(error)
//   }
// })

//Finds existing carts or creates new carts for logged in users and guests
router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const userCart = await Order.findAll({
        where: {userId: req.user.id, isComplete: false},
        include: [{model: Product}]
      })
      //Send back cart data or a message that the cart is empty
      if (userCart[0].products.length === 0) {
        res.send('Your Cart is Empty!')
      } else {
        res.json(userCart)
      }
    } else {
      // const guestCart = await Order.findOrCreate({
      //   where: {userId: req.session.cart.id, isComplete: false},
      //   include: [{model: Product}]
      // })
      // console.log('REQ.SESSION >>>>> ', req.session)
      // console.log('DATAVALUES >>>>> ', req.session.cart)
      // res.json(guestCart)
      const guestCart = new Order(req.session.order ? req.session.order : {})
      req.session.order = guestCart
      console.log('req.session.cart >>>', req.session.order.dataValues)
      res.json(guestCart)
    }
  } catch (err) {
    next(err)
  }
})
