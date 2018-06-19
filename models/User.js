const mongoose = require('mongoose');

// const Schema = mongoose.Schema;
const {Schema} = mongoose;// ^the same, destruction

const userSchema = new Schema({
    googleId: String
});

mongoose.model('users', userSchema);