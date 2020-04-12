const mongoose = require('mongoose');
const {Schema} = mongoose;
const appointmentSchema = new Schema({
    duration_appointment : {
        type : Number,
        default : ""
    },
    price : {
        type : String,
        default: ""
    },
    appointment_date:{
        type: Date,
        default: Date.now()
    },
    status:{
        type: String,
        enum : ['PENDING', 'COMPLETED', 'CONFIRMED', 'CANCELED']
    },
    time_remainder_send_notification:{
      type : Number,
        default : ""
    },
    doctor : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    patient_book:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    }
}, {timestamp: true});
module.exports = mongoose.model('Appointment', appointmentSchema);
