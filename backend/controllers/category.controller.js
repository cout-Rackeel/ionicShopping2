const { error } = require('console');
const { JSONResponse } = require('../lib/helper');
const Category = require('../models/category.model');


// --------------------
// >> Get all category
// --------------------
exports.getAllCategory = async (req, res) => {
    try {
        const category = await Category.find()
        JSONResponse.success(res, 'Success.', category, 200)
    } catch(err) {
        JSONResponse.err(res, "Failure handling the item model.", err, 500)
    }
}

// --------------------
// >> Get category by id
// --------------------
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) throw new Error('No category found');

        JSONResponse.success(res, 'Success.', category, 200);
    } catch(err) {
        JSONResponse.err(res, "Failure handling the category model.", err, 500);
    }
}

// --------------------
// >> Create an category
// --------------------
exports.createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body)
        JSONResponse.success(res, 'Success.', category, 201)
    } catch(err) {
        JSONResponse.err(res, "Failure handling the item model.", err, 500)
    }
}

// --------------------
// >> Update category
// --------------------
exports.updateCategoryById = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body);
        if (!category) throw new Error('No category found');
        JSONResponse.success(res, 'Success.', category, 200);
    } catch(err) {
        JSONResponse.err(res, err.message, err, 500)
    }
}

// --------------------
// >> Delete category
// --------------------
exports.deleteCategoryById = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) throw new Error('No category found');
        JSONResponse.success(res, 'Success.', category, 200);
    } catch(err) {
        JSONResponse.err(res, "Failure handling the category model.", err, 500)
    }
}