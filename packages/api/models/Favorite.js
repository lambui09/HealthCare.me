const mongoose = require('mongoose');
const {Schema} = mongoose;
const favoriteSchema = new Schema({
    is_active : {
        type: Boolean,
        default: false
    },
    favorite_personal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    }
}, {timestamp : true});
module.exports = mongoose.model('Favorite', favoriteSchema);


