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

//"VIEW CART" FOR LOGGED IN USERS OR GUESTS
router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const userCart = await Order.findOrCreate({
        where: {userId: req.user.id, isComplete: false},
        include: [{model: Product}]
      })
      res.json(userCart)
    } else {
      const cart = new OrderItem(req.session.cart ? req.session.cart : {})
      req.session.cart = cart
      res.json(req.session.cart)
    }
  } catch (err) {
    next(err)
  }
})
