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
    }
}, {timestamp: true});
module.exports = mongoose.model('Appointment', appointmentSchema);
