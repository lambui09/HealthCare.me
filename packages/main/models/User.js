const mongose = require('mongoose');
const {Schema} = mongose;
const userSchema = new Schema({
    phone_number: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
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





