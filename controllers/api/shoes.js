const Shoe = require('../../models/shoe')

const dataController = {
  // Index,
  index (req, res, next) {
    Shoe.find({}, (err, foundShoes) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.shoes = foundShoes
        next()
      }
    })
  },
  // Destroy
  destroy (req, res, next) {
    Shoe.findByIdAndDelete(req.params.id, (err, deletedShoe) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.shoe = deletedShoe
        next()
      }
    })
  },
  // Update
  update (req, res, next) {
    req.body.rare = req.body.rare === true
    Shoe.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedShoe) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.shoe = updatedShoe
        next()
      }
    })
  },
  // Create
  create (req, res, next) {
    req.body.rare = req.body.rare === 'on' || req.body.rare === true ? true : false
    Shoe.create(req.body, (err, createdShoe) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.shoe = createdShoe
        next()
      }
    })
  },
  // Edit
  // Show
  show (req, res, next) {
    Shoe.findById(req.params.id, (err, foundShoe) => {
      if (err) {
        res.status(404).send({
          msg: err.message,
          output: 'Could not find a shoe with that ID'
        })
      } else {
        res.locals.data.shoe = foundShoe
        next()
      }
    })
  }
}

const apiController = {
    index (req, res, next) {
      res.json(res.locals.data.shoes)
    },
    show (req, res, next) {
      res.json(res.locals.data.shoe)
    }
  }

module.exports = { dataController, apiController }
