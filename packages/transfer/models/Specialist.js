const mongoose = require('mongoose');
const {Schema} = mongoose;
const specialistSchema = new Schema({
  service_name: {
    type: String,
    default: ""
  },
  image: {
    type: String,
    default: 'https://fortisbangalore.com/frontend/docimage/doctor%20icon%20male-1548060684.jpg'
  },
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});
module.exports = mongoose.model('Specialist', specialistSchema);
