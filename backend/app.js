const express = require('express')
const cors = require('cors')

// Routers
const shoppingListRouter = require('./routes/shopping.routes');
const categoryRouter = require('./routes/category.routes')

const app = express();

// Middleware
app.use(cors('*'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/v1/shopping-list', shoppingListRouter);
app.use('/api/v1/categories', categoryRouter);

module.exports = app;

