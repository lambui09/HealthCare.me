const mongoose = require('mongoose');
const {Schema} = mongoose;
const favoriteSchema = new Schema({
    is_active : {
        type: Boolean,
        default: false
    }
}, {timestamp : true});
module.exports = mongoose.model('Favorite', favoriteSchema);


