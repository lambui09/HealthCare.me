const mongoose = require('mongoose');
const {Schema} = mongoose;
const userSchema = new Schema({
    phone_number: {
        type: String,
        required: true,
        unique: true,
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    confirm_password: {
        type: String,
        required: true
    },
    birth_day: {
        type: Number,
    },
    gender: {
        type: String,
        enum: ["MALE", "FEMALE"]
    },
    avatar: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
    },
    address: {
        type: String,
    },
    location: {
        type: {
            type: String,
            enum: ["POINT"],
        },
        coordinates: {
            type : [Number],
        }
    },
    is_active : {
        type: Boolean,
        default: false
    },
    is_complete: {
        type : Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['ADMIN','DOCTOR','PATIENT'],
        default: 'PATIENT'
    },
    is_exp: {
        type: String,
        default: false,
    },
}, {timestamp: true});
module.exports = mongoose.model('User', userSchema);
//0 admin, 1 doctor, 2 patient





