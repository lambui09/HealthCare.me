const mongoose = require('mongoose');
const {Schema} = mongoose;

const Doctor = require('./Doctor');

const favoriteSchema = new Schema({
    is_favorite : {
        type: Boolean,
        default: false
    },
    favorite_personal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
    },
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

favoriteSchema.post('save', async function (doc) {
    const doctor_id = doc.doctor;
    const doctor = await Doctor.findById(doctor_id);
    const total_favorite = doctor.total_favorite + 1;
    await Doctor.findByIdAndUpdate(doctor_id, { total_favorite });
});

module.exports = mongoose.model('Favorite', favoriteSchema);


