const mongoose = require('mongoose');
const {Schema} = mongoose;
const favoriteSchema = new Schema({
    is_active : {
        type: Boolean,
        default: false
    }
});


