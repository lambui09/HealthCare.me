const mongoose = require('mongoose');
const {Schema} = mongoose;
const checkingServiceSchema = new Schema({
    label_service :{
        type : String,
        default : ""
    },
    description : {
        type: String,
        default: ""
    },
    duration_treatment_service :{
        type : Number,
        default : 0
    },
    price :{
        type : Number,
        default : 0,
    }
}, {timestamp: true});
module.exports = mongoose.model('CheckingService', checkingServiceSchema);