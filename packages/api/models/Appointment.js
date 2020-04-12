const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const appointmentSchema = new Schema({
    price: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        default: 30
    },
    status: {
        type: String,
        enum: ['PENDING', 'COMPLETED', 'CONFIRMED', 'CANCELED'],
        default: 'PENDING'
    },
    time_remainder_send_notification: {
        type: Number,
        default: 30
    },
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
    },
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    }
}, {
    timestamp: true
});
module.exports = mongoose.model('Appointment', appointmentSchema);