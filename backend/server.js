// --------------------
// >> Start the server <<
// --------------------
require('dotenv').config({path:'./config.env'});
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 8080;

// Start Express App
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected Successfully!'))
    .catch(err => console.error(err));

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`))