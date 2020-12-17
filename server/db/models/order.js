const Sequelize = require('sequelize')
const db = require('../db')
const OrderItem = require('./order-item')

const Order = db.define('order', {
  isComplete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  orderTotal: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Order
