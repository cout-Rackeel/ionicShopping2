const express = require('express');
const {
    getAllCategory,
    createCategory,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById,
} = require('../controllers/category.controller')

const router = express.Router()

router.route('/').get(getAllCategory).post(createCategory);
router.route('/:id').get(getCategoryById).put(updateCategoryById).delete(deleteCategoryById)

module.exports = router