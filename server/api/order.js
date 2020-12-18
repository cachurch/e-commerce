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
//     const cart = await OrderItem.findAll(where: {orderId: req.params.id})
//   } catch (error) {

//   }
// })
