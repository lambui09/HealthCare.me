const mongoose = require('mongoose');
const {Schema} = mongoose;
const appointmentSchema = new Schema({
    duration_appointment : {
        type : Number,
        default : 0
    },
    price : {
        type : Number,
        default: 0
    },
    appointment_date:{
        type: Date,
        default: ""
    },
    status:{
        type: String,
        enum : ['PENDING', 'COMPLETED', 'CONFIRMED', 'CANCELED']
    },
    time_remainder_send_notification:{
      type : Number,
        default : 0
    }
}, {timestamp: true});
module.exports = mongoose.model('Appointment', appointmentSchema);
