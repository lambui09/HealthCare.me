const mongoose = require('mongoose');
const {Schema} = mongoose;
const userDeviceSchema = new Schema({
    device_uuid: {
        type: String,
        default: "",
    },
    device_type: {
        type: String,
        default: "",
    },
    device_token : {
        type : String,
        default: "",
    },
    is_active : {
        type: Boolean,
        default : "",
    },
    expirationTime : {
        type : Date,
        default: Date.now()
    }
}, {timestamp: true});
module.exports = mongoose.model('UserDevice', userDeviceSchema);