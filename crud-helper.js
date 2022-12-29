// Connect to the database
require('dotenv').config();
require('./config/database');

// Require the Mongoose models
// const User = require('./models/user');
// const Item = require('./models/item');
// const Category = require('./models/category');
// const Order = require('./models/order');

const Shoe = require('./models/shoe')

// Local variables will come in handy for holding retrieved documents
let user, item, category, order, shoe;
let users, items, categories, orders, shoes;
