const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const SymptomSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

module.exports = mongoose.model('Symptom', SymptomSchema);