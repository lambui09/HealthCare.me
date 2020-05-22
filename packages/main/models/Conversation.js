const mongoose = require('mongoose');
const {Schema} = mongoose;
const conversationSchema = new Schema({
    is_read: {
        type : Boolean,
        default: false
    }
},{
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});
module.exports = mongoose.model('Conversation', conversationSchema);
