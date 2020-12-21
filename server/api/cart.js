const router = require('express').Router()
const {Product} = require('../db/models')
const {Order} = require('../db/models')
const {OrderItem} = require('../db/models')
module.exports = router

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
      const guestCart = await Order.findAll({
        where: {id: req.session.order.id, isComplete: false},
        include: [{model: Product}]
      })
      res.json(guestCart)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    //Creates a cart for guests and users > methods need to be updated to find or create
    if (!req.user) {
      const guestCart = await Order.create({
        include: [{model: Product}]
      })
      req.session.order.id = guestCart.dataValues.id
      res.json(guestCart)
    } else {
      const userCart = await Order.create({
        where: {userId: req.user.id},
        include: [{model: Product}]
      })
      res.json(userCart)
    }
  } catch (error) {
    next(error)
  }
})
