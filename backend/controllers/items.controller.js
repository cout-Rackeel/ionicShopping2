const { error } = require('console');
const { JSONResponse } = require('../lib/helpers')
const Items = require('../models/items.model');


// --------------------
// >> Get All items
// --------------------
exports.getAllItems = async (req, res) => {
    try {
        const items = await Items.find()
        JSONResponse.success(res, 'Success.', items, 200)
    } catch(err) {
        JSONResponse.err(res, "Failure handling the item model.", err, 500)
    }
}

// --------------------
// >> Get item by id
// --------------------
exports.getItemById = async (req, res) => {
    try {
        const item = await Items.findById(req.params.id);
        if (!item) throw new Error('No item found');

        JSONResponse.success(res, 'Success.', item, 200);
    } catch(err) {
        JSONResponse.err(res, "Failure handling the item model.", err, 500);
    }
}

// --------------------
// >> Create an item
// --------------------
exports.createItem = async (req, res) => {
    try {
        console.log(req.body);
        const items = await Items.create(req.body)
        JSONResponse.success(res, 'Success.', items, 201)
    } catch(err) {
        JSONResponse.err(res, "Failure handling the item model.", err.message, 500)
    }
}

// --------------------
// >> Update item
// --------------------
exports.updateItemById = async (req, res) => {
    try {
        const item = await Items.findByIdAndUpdate(req.params.id, req.body);
        if (!item) throw new Error('No item found');
        JSONResponse.success(res, 'Success.', item, 200);
    } catch(err) {
        JSONResponse.err(res, "Failure handling the item model.", err, 500)
    }
}

// --------------------
// >> Delete item
// --------------------
exports.deleteItemById = async (req, res) => {
    try {
        const item = await Items.findByIdAndDelete(req.params.id);
        if (!item) throw new Error('No item found');
        JSONResponse.success(res, 'Success.', item, 200);
    } catch(err) {
        JSONResponse.err(res, "Failure handling the item model.", err, 500)
    }
}
