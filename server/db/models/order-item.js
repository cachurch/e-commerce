const Sequelize = require('sequelize')
const db = require('../db')
const Order = require('./order')
const Product = require('./product')

const OrderItem = db.define('orderItem', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  //The amount of items in an order
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  //the price for a single unit of that item
  productPrice: {
    type: Sequelize.INTEGER
  },
  //the combined price for all items (single product)
  totalPrice: {
    type: Sequelize.INTEGER
  }
})

//general idea?
OrderItem.prototype.add = async function() {
  try {
    this.quantity++
    this.totalPrice = this.quantity * this.productPrice
    await this.save()
  } catch (error) {
    console.error(error)
  }
}

OrderItem.prototype.delete = async function() {
  try {
    if (this.quantity >= 1) {
      this.quantity--
      this.totalPrice = this.quantity * this.productPrice
    } else {
      this.quantity = 0
      this.totalPrice = 0
    }

    await this.save()
  } catch (error) {
    console.error(error)
  }
}

module.exports = OrderItem
