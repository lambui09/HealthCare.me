const mongoose = require('mongoose');
const {Schema} = mongoose;
const notificationSchema = new Schema({
    title: {
        type: String,
        default: ""
    },
    content: {
        type: String,
        default: "",
    },
    has_read: {
        type : Boolean,
        default: false
    }
}, {timestamp: true});
module.exports = mongoose('Notification', notificationSchema);
