const mongoose = require('mongoose');
const {Schema} = mongoose;
const SurveySymptomSchema = new Schema({
    symptom_name: {
        type: String,
        required: true,
    },
    is_active: {
        type: Boolean,
        default: false,
    },
    is_delete: {
        type: Boolean,
        default: false,
    },
    patient_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
    },
}, {timestamp: true});
module.exports = mongoose.model('SurveySymptom', SurveySymptomSchema);