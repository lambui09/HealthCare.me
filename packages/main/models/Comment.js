const mongoose = require('mongoose');
const {Schema} = mongoose;
const Doctor = require('./Doctor');

const commentSchema = new Schema({
    content: {
        type: String,
        default: "",
        require: true,
    },
    rate_star:{
        type: Number,
        required: true,
    },
    commenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
    },
},{
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

commentSchema.post('save', async function (doc) {
    const doctor_id = doc.doctor;
    const doctor = await Doctor.findById(doctor_id);
    const total_rate = doctor.total_rate + 1;
    const rate_star = (doctor.rate_star * doctor.total_rate + doc.rate_star) / total_rate;
    await Doctor.findByIdAndUpdate(doctor_id, {
        total_rate,
        rate_star
    });
});

module.exports = mongoose.model('Comment', commentSchema);