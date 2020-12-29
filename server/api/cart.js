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
      // console.log(req.session.id, req.session)
      // Find an open cart for a guest
      const guestCart = await Order.findAll({
        // where: {id: req.session.order.id, isComplete: false},
        // include: [{model: Product}]
      })
      //Send back cart data or a message that the cart is empty
      res.json(guestCart)

      // if (!guestCart || guestCart.products.length === 0) {
      //   res.send('Your Cart is Empty!')
      // } else {
      //   res.json(guestCart)
      // }
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    // // For testing the user -----------------
    // if (req.user) req.user.id = 1
    // else req.user = {id: 1}
    // -----------------------------------------

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
      const hello = 'hi'
      if (req.session.order) {
        const guestCart = await Order.findOne({
          where: {id: req.session.order.id, isComplete: false},
          include: [{model: Product}]
        })
        console.log(
          '>>>>>> POST REQ.SESSION >>>>>>> ',
          req.session.id,
          req.session
        )
        // console.log('guestCart >>>>>>>>>>>>>>> ', guestCart)
        const newItem = await OrderItem.create({
          productId: req.body.productId,
          orderId: guestCart.id
        })

        res.json({guestCart, newItem})
      } else {
        const guestCart = await Order.create({})
        req.session.order = {}
        req.session.order.id = guestCart.dataValues.id

        const newItem = await OrderItem.create({
          productId: req.body.productId,
          orderId: guestCart.id
        })
        res.json({guestCart, newItem})
      }

      //-----------------------------------------------------------------------
      // //Creates a cart for guests > method needs to be updated to find or create

      // // req.session = {}

      // const guestCart = await Order.findOrCreate({
      //   where: {id: req.session.order.id, isComplete: false},
      //   include: [{model: Product}]
      // })

      // const newItem = await OrderItem.create({
      //   productId: req.body.productId,
      //   orderId: guestCart[0].id
      // })

      // //This sets the order id just created to the order id on the session
      // req.session.order.id = guestCart.dataValues.id

      // //Add OrderItem create() method here

      // res.json({guestCart, newItem})
      //---------------------------------------------------------------------------------
    }
  } catch (error) {
    next(error)
  }
})

// //----------------------------------------------------------------------------

//  // req.session = {}
//  if (req.session.order) {
//   const guestCart = await Order.findOne({
//     where: {id: req.session.order.id, isComplete: false},
//     include: [{model: Product}]
//   })
//   const newItem = await OrderItem.create({
//   productId: req.body.productId,
//   orderId: guestCart.id
//   })
//   res.json({guestCart, newItem})
// } else {
//   // req.session.order = {}
//   const guestCart = await Order.create({})
//   req.session.order.id = guestCart.dataValues.id

//   const newItem = await OrderItem.create({
//   productId: req.body.productId,
//   orderId: guestCart.id
//   })
//   res.json({guestCart, newItem})
// }
