const mongoose = require('mongoose');
const {
    Schema
} = mongoose;
const doctorSchema = new Schema({
    phone_number: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    full_name: {
        type: String,
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
            type: [Number],
        }
    },
    is_active: {
        type: Boolean,
        default: false
    },
    is_complete: {
        type: Boolean,
        default: false
    },
    medical_doctor: {
        type: String,
        default: ""
    },
    awards: {
        type: String,
        default: ""
    },
    about: {
        type: String,
        default: ""
    },
    year_experience: {
        type: Number,
        default: 0
    },
    working_schedule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WorkingSchedule'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamp: true
});
module.exports = mongoose.model("Doctor", doctorSchema);