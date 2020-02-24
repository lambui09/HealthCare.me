const mongose = require('mongoose');
const {Schema} = mongose;
const userSchema = new Schema({
    phone_number: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
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
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["MALE", "FEMALE"]
    },
    avatar: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
    },
    address: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ["POINT"],
            required: true
        },
        coordinates: {
            type : [Number],
            required: true
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
    }
}, {timestamp: true});
module.exports = mongose.model('User', userSchema);
//0 admin, 1 doctor, 2 patient





