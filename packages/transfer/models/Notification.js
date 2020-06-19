const mongoose = require('mongoose');
const {Schema} = mongoose;
const notificationSchema = new Schema({
  title: {
    type: String,
    default: ""
  },
  body: {
    type: String,
    default: "",
  },
  has_read: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});
module.exports = mongoose.model('Notification', notificationSchema);
