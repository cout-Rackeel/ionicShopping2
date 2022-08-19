const mongoose = require('mongoose')

let itemsSchema = new mongoose.Schema({
    category: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category', required: true },
    item_name: { type: String, required: true },
    price: { type: Number, required: true },
    // quantity: Number
    quantity: { type: Number, required: [true, "Must provide a quantity"] }
})

// anything that starts with 'find'
itemsSchema.pre(/^find/, function(next){
    this.populate('category')
    next()
})

module.exports = mongoose.model('Item', itemsSchema)

