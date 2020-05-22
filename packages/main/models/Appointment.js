const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const Doctor = require('./Doctor');

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
        default: 15
    },
    status: {
        type: String,
        enum: ['PENDING', 'COMPLETED', 'CONFIRMED', 'CANCELED'],
        default: 'PENDING'
    },
    time_remainder_send_notification: {
        type: Number,
        default: 0
    },
    symptom_list: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Symptom',
        required: true,
    }],
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
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

appointmentSchema.post(/update/i, async function (doc) {
    if (doc.status === 'COMPLETED') {
        const doctor_id = doc.doctor_id._id;
        const doctor = await Doctor.findById(doctor_id);
        const total_book = doctor.total_book + 1;
        await Doctor.findByIdAndUpdate(doctor_id, {
            total_book,
        });
    }
});

module.exports = mongoose.model('Appointment', appointmentSchema);