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
    await this.save()
  } catch (error) {
    console.error(error)
  }
}

// Order.addHook('afterCreate', async function(order) {
//   try {
//     const items = await OrderItem.findOne({where: {orderId: order.id}})

//     console.log('ORDER TOTAL', this.orderTotal)
//     console.log('items', items)
//     console.log('ORDER ID', order.id)
//   } catch (error) {
//     console.error(error)
//   }
// })

// User.addHook('afterCreate', async (user, options) => {
//   // We can use `options.transaction` to perform some other call
//   // using the same transaction of the call that triggered this hook
//   await User.update({ mood: 'sad' }, {
//     where: {
//       userId: user.id
//     },
//     transaction: options.transaction
//   });
// });

module.exports = Order
