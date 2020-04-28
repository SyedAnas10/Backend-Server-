// importing node modules to define a Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dishes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    }]
},{
    timestamps: true
});

// initializing Favorites with defined model FavoriteSchema
const Favorites = mongoose.model('Favorite', FavoriteSchema);

module.exports = Favorites;