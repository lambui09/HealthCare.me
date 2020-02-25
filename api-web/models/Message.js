const mongoose = require('mongoose');
const {Schema} = mongoose;
const messageSchema = new Schema({
    content: {
        type : String,
        default : ""
    }
},{timestamp: true});
module.exports = mongoose.model('Message', messageSchema);
