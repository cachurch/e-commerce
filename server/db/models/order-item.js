const Sequelize = require('sequelize')
const db = require('../db')
const Order = require('./order')
const Product = require('./product')

const OrderItem = db.define('orderItem', {
  // id: {
  //   type: Sequelize.INTEGER,
  //   primaryKey: true,
  //   autoIncrement: true
  // },
  //The amount of items in an order
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  //the price for a single unit of that item
  productPrice: {
    type: Sequelize.INTEGER
  },
  //the combined price for all items (single product)
  totalPrice: {
    type: Sequelize.INTEGER,
    defaultValue: this.productPrice
  }
})

OrderItem.prototype.checkOwnership = async function(user) {
  try {
    const order = await Order.findByPk(this.orderId)
    if (order) {
      if (user.id === order.userId) {
        return true
      }
    }
    return false
  } catch (error) {
    console.error(error)
  }
}

OrderItem.prototype.increment = async function() {
  try {
    this.quantity++
    this.totalPrice = this.quantity * this.productPrice
    await this.save()
  } catch (error) {
    console.error(error)
  }
}

OrderItem.prototype.decrement = async function() {
  try {
    if (this.quantity > 1) {
      this.quantity--
      this.totalPrice = this.quantity * this.productPrice
    }
    await this.save()
  } catch (error) {
    console.error(error)
  }
}

//create beforeSave() hook to populate the default total price field as the price of one unit

module.exports = OrderItem
