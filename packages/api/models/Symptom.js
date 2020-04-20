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
    timestamp: true
});

module.exports = mongoose.model('Symptom', SymptomSchema);