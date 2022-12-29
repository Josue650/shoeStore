const express = require('express')
const router = express.Router()
const { dataController, apiController } = require('../../controllers/api/shoes')

// add routes
// Index /api/shoes
router.get('/', dataController.index, apiController.index)
// Delete /api/shoes/:id
router.delete('/:id', dataController.destroy, apiController.show)
// Update /api/shoes/:id
router.put('/:id', dataController.update, apiController.show)
// Create /api/shoes
router.post('/', dataController.create, apiController.show)
// Show /api/shoes/:id
router.get('/:id', dataController.show, apiController.show)


module.exports = router
