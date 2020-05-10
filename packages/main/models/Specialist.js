const mongoose = require('mongoose');
const {Schema} = mongoose;
const specialistSchema = new Schema({
    name: {
        type: String,
        default: ""
    },
    icon: {
        type: String,
        default: 'https://fortisbangalore.com/frontend/docimage/doctor%20icon%20male-1548060684.jpg'
    },
    description: {
        type: String,
        default: ""
    } ,
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
    }
}, {timestamp: true});
module.exports = mongoose.model('Specialist', specialistSchema);