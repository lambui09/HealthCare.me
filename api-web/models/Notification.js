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
    }
}, {timestamp: true});
module.exports = mongoose('Notification', notificationSchema);
