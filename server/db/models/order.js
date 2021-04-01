const Sequelize = require('sequelize')
const db = require('../db')
// const OrderItem = require('./order-item')

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

Order.prototype.getTotal = async function(id) {
  try {
    const items = await OrderItem.findAll({
      where: {id: id}
    })
    for (let key in items) {
      if (this.isComplete === false) {
        this.orderTotal += items[key].totalPrice
      }
    }
  } catch (error) {
    console.error(error)
  }
}

module.exports = Order
