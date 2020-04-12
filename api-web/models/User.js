const mongose = require('mongoose');
const {Schema} = mongose;
const userSchema = new Schema({
    phone_number: {
        type: String,
        required: false
    },
    first_name: {
        type: String,
        required: false
    },
    last_name: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    confirm_password: {
        type: String,
        required: false
    },
    birth_day: {
        type: Number,
        required: false
    },
    gender: {
        type: String,
        required: false,
        enum: ["MALE", "FEMALE"]
    },
    avatar: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
    },
    address: {
        type: String,
        required: false
    },
    location: {
        type: {
            type: String,
            enum: ["POINT"],
            required: false
        },
        coordinates: {
            type : [Number],
            required: false
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
    }


}, {timestamp: false});
module.exports = mongose.model('User', userSchema);
//0 admin, 1 doctor, 2 patient





