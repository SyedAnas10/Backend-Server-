const mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
          default: ''
      },
      lastname: {
        type: String,
          default: ''
      },
    admin: {
        type: Boolean,
        default: false
    }
});

// connecting the schema with plugin 
userSchema.plugin(passportLocalMongoose);

const Users = mongoose.model('User',userSchema);

module.exports = Users ;