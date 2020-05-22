const mongoose = require('mongoose');
const {Schema} = mongoose;
const messageSchema = new Schema({
    content: {
        type : String,
        default : ""
    }
},{
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});
module.exports = mongoose.model('Message', messageSchema);
