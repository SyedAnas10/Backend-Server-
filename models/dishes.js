// importing node modules to define a schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// required a node_module for the currency type value
require('mongoose-currency').loadType(mongoose);
const currency = mongoose.Types.Currency;

// defining comment schema for all the comments
const commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
});

// defining a Dish schema for all the dishes
const dishSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: 'true'
    },
    price: {
        type: currency,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default: false
    },
    comments : [ commentSchema ]
},{
    timestamps: true
});

// initialise Dishes with the defined model dishSchema
var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;