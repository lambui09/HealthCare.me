const mongoose = require('mongoose');
const {Schema} = mongoose;
const commentSchema = new Schema({
    content: {
        type: String,
        default: "",
    }
},{timestamp: true});
module.exports = mongoose.model('Comment', commentSchema);