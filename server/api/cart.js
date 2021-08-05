const router = require('express').Router()
const {Product} = require('../db/models')
const {Order} = require('../db/models')
const {OrderItem} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    // For testing the user -----------------
    // if (req.user) req.user.id = 1
    // else req.user = {id: 1}
    // ------------------------------------------
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
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    // For testing the user -----------------
    // if (req.user) req.user.id = 1
    // else req.user = {id: 1}
    // -----------------------------------------

    //finds or creates open carts for users
    if (req.user) {
      const userCart = await Order.findOrCreate({
        where: {userId: req.user.id, isComplete: false},
        include: [{model: Product}]
      })
      //This updates the instance of a newly created userCart to have an empty products array, to avoid a front end error
      if (!userCart[0].products) {
        userCart[0].dataValues.products = []
      }

      const newItem = await OrderItem.create({
        productId: req.body.id,
        productPrice: req.body.price,
        orderId: userCart[0].id
      })

      //This adds product values to a new "orderItem" field on the newProduct object which is sent up to the frontend. this ensures I have access to the correctly organized set of info to map over on the front end.
      const newProduct = await Product.findByPk(req.body.id)
      newProduct.dataValues.orderItem = newItem

      res.json({userCart: userCart[0], newItem: newProduct})
    } else {
      res.status(304).send('Please Login!')
    }
  } catch (error) {
    next(error)
  }
})

router.put('/increment/:id', async (req, res, next) => {
  try {
    // For testing the user -----------------
    // if (req.user) req.user.id = 1
    // else req.user = {id: 1}
    // -----------------------------------------

    const item = await OrderItem.findByPk(req.params.id)
    if (item) {
      if (!await item.checkOwnership(req.user)) {
        return res.sendStatus(403)
      }
      await item.increment()
      res.send(item)
    } else {
      res.status(404).send('Item Not Found :(')
    }
  } catch (error) {
    next(error)
  }
})

router.put('/decrement/:id', async (req, res, next) => {
  try {
    const item = await OrderItem.findByPk(req.params.id)
    if (item) {
      if (!await item.checkOwnership(req.user)) {
        return res.sendStatus(403)
      }
      await item.decrement()
      res.send(item)
    } else {
      res.status(404).send('Item Not Found :(')
    }
  } catch (error) {
    next(error)
  }
})

router.put('/checkout/:id', async (req, res, next) => {
  try {
    const checkedOut = await Order.findByPk(req.params.id)
    checkedOut.update({isComplete: true})
    await checkedOut.save()
    res.send(checkedOut)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const item = await OrderItem.findByPk(req.params.id)
    if (item) {
      if (!await item.checkOwnership(req.user)) {
        return res.sendStatus(403)
      }
      await item.destroy()
      res.sendStatus(204)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

// const hello = 'hi'
// if (req.session.order) {
//   const guestCart = await Order.findOne({
//     where: {id: req.session.order.id, isComplete: false},
//     include: [{model: Product}]
//   })
//   // console.log('>>>>>> POST REQ.SESSION >>>>>>> ', req.session.id,req.session)
//   // console.log('guestCart >>>>>>>>>>>>>>> ', guestCart)
//   const newItem = await OrderItem.create({
//     productId: req.body.productId,
//     orderId: guestCart.id
//   })

//   res.json({guestCart, newItem})
// } else {
//   const guestCart = await Order.create({})
//   req.session.order = {}
//   req.session.order.id = guestCart.dataValues.id

//   const newItem = await OrderItem.create({
//     productId: req.body.productId,
//     orderId: guestCart.id
//   })
//   res.json({guestCart, newItem})
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

// router.get('/', async (req, res, next) => {
//   try {
//     //Find an open cart for a logged in user
//     if (req.user) {
//       const userCart = await Order.findOne({
//         where: {userId: req.user.id, isComplete: false},
//         include: [{model: Product}]
//       })
//       //Send back cart data or a message that the cart is empty
//       if (!userCart || userCart.products.length === 0) {
//         res.send('Your Cart is Empty!')
//       } else {
//         res.json(userCart)
//       }
//     } else {
//       // console.log(req.session.id, req.session)
//       // Find an open cart for a guest
//       const guestCart = await Order.findAll({
//         // where: {id: req.session.order.id, isComplete: false},
//         // include: [{model: Product}]
//       })
//       //Send back cart data or a message that the cart is empty
//       res.json(guestCart)

//       // if (!guestCart || guestCart.products.length === 0) {
//       //   res.send('Your Cart is Empty!')
//       // } else {
//       //   res.json(guestCart)
//       // }
//     }
//   } catch (err) {
//     next(err)
//   }
// })
