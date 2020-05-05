const mongoose = require('mongoose');
const {Schema} = mongoose;
const conversationSchema = new Schema({
    is_read: {
        type : Boolean,
        default: false
    }
},{timestamp : true});
module.exports = mongoose.model('Conversation', conversationSchema);
