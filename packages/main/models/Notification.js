const mongoose = require('mongoose');
const {Schema} = mongoose;
const notificationSchema = new Schema({
    title: {
        type: String,
        default: ""
    },
    body: {
        type: String,
        default: "",
    },
    has_read: {
        type : Boolean,
        default: false
    },
    patient: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Patient'
    },
    doctor: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Doctor'
    },
    isSent: {
        type: Boolean,
        required: true,
    },
    time_remainder_send_notification:{
        type: Date,
    }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});
module.exports = mongoose.model('Notification', notificationSchema);
