// 1. Import the necessary modules

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
       
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

});

// 2. Create a model using the schema

const User = mongoose.model('userModel', userSchema);

module.exports = User;