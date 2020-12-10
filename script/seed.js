'use strict'

const db = require('../server/db')
const {User, Product, Order} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      isAdmin: true,
      firstName: 'Cody',
      lastName: 'Pug',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      isAdmin: true,
      firstName: 'Murphy',
      lastName: 'Cat',
      email: 'murphy@email.com',
      password: '123'
    })
  ])

  const products = await Promise.all([
    Product.create({
      artist: 'Franz Kline',
      title: 'Untitled',
      imageUrl:
        'https://d7hftxdivxxvm.cloudfront.net/?resize_to=fit&width=390&height=300&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FJQI2YbnwwGCiT7dHH41_9A%2Flarge.jpg',
      price: 50000
    }),
    Product.create({
      artist: 'Franz Kline',
      title: 'Study for High Street',
      imageUrl:
        'http://www.artnet.com/WebServices/images/ll00006lldaXbJFgPjECfDrCWvaHBOcCRzF/franz-kline-study-for-high-street.jpg',
      price: 35000
    }),
    Product.create({
      artist: 'Franz Kline',
      title: 'Ochre and Grey Composition',
      imageUrl:
        'http://www.artnet.com/WebServices/images/ll00045lldKXbJFg03G72CfDrCWvaHBOc3eyF/franz-kline-ochre-and-grey-composition.jpg',
      price: 35000
    })
  ])

  const orders = await Promise.all([
    Order.create({
      isComplete: false
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
