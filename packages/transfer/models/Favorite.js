const mongoose = require('mongoose');
const {Schema} = mongoose;
const favoriteSchema = new Schema({
  is_favorite: {
    type: Boolean,
    default: false
  },
  favorite_personal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});
module.exports = mongoose.model('Favorite', favoriteSchema);


