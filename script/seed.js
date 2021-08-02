'use strict'

const db = require('../server/db')
const {User, Product, Order} = require('../server/db/models')

console.log(db)

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
      isAdmin: false,
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
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT34nJ7Toy2gPoh4ZAc8ks0RQ6Kfkdw7_3Ggg&usqp=CAU',
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
    }),
    Product.create({
      artist: 'Franz Kline',
      title: 'Mahoning',
      imageUrl:
        'https://galleryintell.com/wp-content/uploads/2013/10/Franz-Kline_Mahoning-1956_ArtEx.jpg',
      price: 35000
    }),
    Product.create({
      artist: 'Franz Kline',
      title: 'Mahoning',
      imageUrl:
        'https://miro.medium.com/max/6636/1*cr0GmNSI1pZQ1XYdu_OE4A.jpeg',
      price: 35000
    }),
    Product.create({
      artist: 'Donald Judd',
      title: 'Suite of five chairs #84/85',
      imageUrl: 'https://moussemagazine.it/app/uploads/1-44.jpg',
      price: 35000
    }),
    Product.create({
      artist: 'Donald Judd',
      title: 'Untitled',
      imageUrl:
        'https://www.gallery.ca/sites/default/files/styles/ngc_crop_16x9_1600px/public/herojudd.jpg?itok=Q1lqynEp&timestamp=1556744190',
      price: 35000
    }),
    Product.create({
      artist: 'Donald Judd',
      title: 'Untitled',
      imageUrl:
        'https://s31531.pcdn.co/wp-content/uploads/2018/05/GettyImages-564086751-1024x683.jpg',
      price: 35000
    }),
    Product.create({
      artist: 'Donald Judd',
      title: 'Untitled',
      imageUrl:
        'https://www.moma.org/d/assets/W1siZiIsIjIwMTkvMDQvMjkvNjVzM3QyeTZ3NV9Eb25hbGRfSnVkZC5qcGciXSxbInAiLCJjb252ZXJ0IiwiLXF1YWxpdHkgOTAgLXJlc2l6ZSAyMDAweDIwMDBcdTAwM2UiXV0/Donald-Judd.jpg?sha=b36f61d3a3379dad',
      price: 35000
    }),
    Product.create({
      artist: 'Donald Judd',
      title: 'Table',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5fdWElt0Rz-agGHTrTLAspTqi6NR3WDHcfQ&usqp=CAU',
      price: 35000
    }),
    Product.create({
      artist: 'Richard Serra',
      title: 'Untitled',
      imageUrl:
        'https://d32dm0rphc51dk.cloudfront.net/a9TW7Jy8LwIUsZ8w2sPTwg/large.jpg',
      price: 35000
    }),
    Product.create({
      artist: 'Richard Serra',
      title: 'To Lift',
      // imageUrl:
      // 'https://www.glenstone.org/wp-content/uploads/prod/2018/08/SERRr_GF_ToLift-731x548.jpg',
      price: 350000
    }),
    Product.create({
      artist: 'Richard Serra',
      title: 'To Lift',
      // imageUrl:
      //   'https://www.glenstone.org/wp-content/uploads/prod/2018/07/SERRr_GF_Contour290_01-731x548.jpg',
      price: 350000
    }),
    Product.create({
      artist: 'Richard Serra',
      title: 'Untitled',
      imageUrl: 'https://farticulate.files.wordpress.com/2010/12/15269aa4.jpg',
      price: 350000
    }),
    Product.create({
      artist: 'Richard Serra',
      title: 'Double Rift',
      imageUrl:
        'https://medias.slash-paris.com/main_images/images/000/010/636/richard_serra_galerie_lelong_paris_exposition-1_large.jpg?1519062386',
      price: 350000
    }),
    Product.create({
      artist: 'Sol Lewitt',
      title: 'Drawing #278',
      imageUrl:
        'https://www.nationalgalleries.org/sites/default/files/LeWitt-desktopLarge.jpg',
      price: 350000
    }),
    Product.create({
      artist: 'Sol Lewitt',
      title: 'Drawing #1741',
      imageUrl:
        'https://massmoca.org/wp-content/uploads/2015/11/Sol-LeWitt-Partnership.jpg',
      price: 350000
    }),
    Product.create({
      artist: 'Sol Lewitt',
      title: 'Drawing #2165',
      imageUrl: 'https://massmoca.org/wp-content/uploads/2015/12/289-1.jpg',
      price: 350000
    }),
    Product.create({
      artist: 'Sol Lewitt',
      title: 'Drawing #416',
      imageUrl:
        'https://aestheticamagazine.com/wp-content/uploads/2016/10/Sol-Lewitt.png',
      price: 350000
    }),
    Product.create({
      artist: 'Sol Lewitt',
      title: 'Untitled',
      imageUrl:
        'https://www.dorotheum.com/fileadmin/lot-images/38M180517/hires/sol-lewitt-5190017.jpg',
      price: 350000
    }),
    Product.create({
      artist: 'Mark Di Suvero',
      title: 'Untitled',
      imageUrl:
        'https://www.theparisreview.org/blog/wp-content/uploads/2016/05/pl001.png',
      price: 350000
    }),
    Product.create({
      artist: 'Mark Di Suvero',
      title: 'Untitled',
      imageUrl:
        'https://s3-external-1.amazonaws.com/veevartnaresized/00D4100000061zzEAA/a1641000000W9hjAAC/File-2089_medium.jpeg',
      price: 350000
    }),
    Product.create({
      artist: 'Mark Di Suvero',
      title: 'Untitled',
      imageUrl:
        'https://d32dm0rphc51dk.cloudfront.net/s7YzF_xzJbGYwGghjEnhAA/large.jpg',
      price: 350000
    }),
    Product.create({
      artist: 'Mark Di Suvero',
      title: 'Untitled',
      imageUrl: 'http://www.nyartbeat.com/media/event/2020/F64F-620',
      price: 350000
    }),
    Product.create({
      artist: 'Mark Di Suvero',
      title: 'Sculpture #15',
      imageUrl:
        'https://d7hftxdivxxvm.cloudfront.net/?resize_to=fit&width=450&height=300&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FWGHY0m1ce5RCqFqJiHwzhg%2Flarge.jpg',
      price: 350000
    }),
    Product.create({
      artist: 'Clyfford Still',
      title: 'PH-389',
      imageUrl:
        'https://2aiyw71zf9ht13dm9ge29mr1-wpengine.netdna-ssl.com/wp-content/uploads/2020/08/homehero_lateworks_ph389detail.jpg',
      price: 350000
    }),
    Product.create({
      artist: 'Clyfford Still',
      title: 'PH-123',
      imageUrl: 'https://whitneymedia.org/assets/artwork/16291/193376.jpeg',
      price: 350000
    }),
    Product.create({
      artist: 'Clyfford Still',
      title: 'PH-972',
      imageUrl:
        'https://wp-cpr.s3.amazonaws.com/uploads/2019/06/clyfford_orange-2.jpg',
      price: 350000
    }),
    Product.create({
      artist: 'Clyfford Still',
      title: 'PH-364',
      imageUrl:
        'https://southwestcontemporary.com/wp-content/uploads/2019/12/PH-432.jpg',
      price: 350000
    }),
    Product.create({
      artist: 'Clyfford Still',
      title: 'PH-364',
      imageUrl:
        'https://uploads7.wikiart.org/images/clyfford-still/untitled-1974.jpg',
      price: 350000
    })
  ])

  const orders = await Promise.all([
    Order.create({
      isComplete: false
    })
  ])

  // const orderItems = await Promise.all([
  //   OrderItem.create({
  //     quantity: 1,
  //     productPrice: 35000,
  //     totalPrice: 35000,
  //     productId: 1,
  //     orderId: 1
  //   }),
  //   OrderItem.create({
  //     quantity: 1,
  //     productPrice: 35000,
  //     totalPrice: 35000,
  //     productId: 2,
  //     orderId: 1
  //   }),
  //   OrderItem.create({
  //     quantity: 1,
  //     productPrice: 35000,
  //     totalPrice: 35000,
  //     productId: 3,
  //     orderId: 1
  //   })
  // ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${orders.length} orders`)
  // console.log(`seeded ${orderItems.length} orders`)
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
