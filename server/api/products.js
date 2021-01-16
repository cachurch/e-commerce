const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

// const isAdmin = (req, res, next) => {
//   if (!req.user.isAdmin || !req.user) {
//     const error = new Error('Unauthorized')
//     next(error)
//   } else {
//     next()
//   }
// }

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    res.json(product)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const selectedProduct = await Product.findByPk(req.params.id)
    const updatedProduct = await selectedProduct.update(req.body)
    res.json(updatedProduct)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Product.destroy({
      where: {id: req.params.id}
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
