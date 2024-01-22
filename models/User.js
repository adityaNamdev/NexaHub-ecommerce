const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role:{
        type:String,
        default:'CUSTOMER'
    },
    securityAnswer:{
        type:String,
        required:true,
    },
    address :{
        type:{},
        required: true
    }
},  { timestamps: true } );

module.exports = mongoose.model('users', userSchema);
