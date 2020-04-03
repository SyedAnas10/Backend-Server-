// importing node modules 
const mongoose = require('mongoose');
require('mongoose-currency').loadType.mongoose;

const Schema = mongoose.Schema;
const currency = mongoose.Types.Currency;

// defining a Schema for all the Leaders
const PromotionSchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: currency,
        required: true,
        min: 0
    },
    feature: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});

// initialise Leaders with defined model leaderSchema
var Promotions = mongoose.model('Promotion', PromotionSchema);

module.exports = Promotions ;