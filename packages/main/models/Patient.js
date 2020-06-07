const mongoose = require('mongoose');
const {Schema} = mongoose;
const patientSchema = new Schema({
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
        type: String,
    },
    gender: {
        type: String,
        enum: ["MALE", "FEMALE", "OTHERS"]
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
            enum: ["Point"],
        },
        coordinates: {
            type: [Number, Number],
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
    unseen_notification_count: {
        type: Number,
        default: 0
    },
    device_token: {
        type: String,
        default: "",
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
},
{
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

patientSchema.index({
    location: "2dsphere"
});

module.exports =mongoose.model("Patient", patientSchema);

