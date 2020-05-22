const mongoose = require('mongoose');
const {Schema} = mongoose;
const commentSchema = new Schema({
    content: {
        type: String,
        default: "",
        require: true,
    },
    rate_star:{
        type: Number,
        required: true,
    },
    commenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
    },
},{
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});
module.exports = mongoose.model('Comment', commentSchema);