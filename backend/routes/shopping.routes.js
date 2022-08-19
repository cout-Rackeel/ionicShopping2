const express = require('express');
const {
    getAllItems,
    createItem,
    getItemById,
    updateItemById,
    deleteItemById,
} = require('../controllers/items.controller')

const router = express.Router()

router.route('/').get(getAllItems).post(createItem);
router.route('/:id').get(getItemById).put(updateItemById).delete(deleteItemById)

module.exports = router