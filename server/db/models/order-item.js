const Sequelize = require('sequelize')
const db = require('../db')
const Order = require('./order')

const OrderItem = db.define('orderItem', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  //The amount of items in an order
  quantity: {
    type: Sequelize.INTEGER
  },
  //the price for a single unit of that item
  productPrice: {
    type: Sequelize.INTEGER
  },
  //the combined price of all items
  totalPrice: {
    type: Sequelize.INTEGER
  }
})

OrderItem.prototype.add = async function(price) {
  try {
    this.quantity++
    this.productPrice = this.quantity * this.productPrice
    await this.save()
  } catch (error) {
    console.error(error)
  }
}

OrderItem.prototype.delete = async function(price) {
  try {
    if (this.quantity >= 1) {
      this.quantity--
    }
  } catch (error) {
    console.error(error)
  }
}

module.exports = OrderItem
