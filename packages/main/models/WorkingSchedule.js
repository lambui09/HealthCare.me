const mongoose = require('mongoose');
const {
    Schema
} = mongoose;
const workingScheduleSchema = new Schema({
    from_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    start_time: {
        type: String,
        required: true,
    },
    end_time: {
        type: String,
        required: true,
    },
    list_time: {
        type: [String],
        default: [],
    },
    duration_default_appointment: {
        type: Number,
        default: 30,
    },
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
    }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});
module.exports = mongoose.model('WorkingSchedule', workingScheduleSchema);
//luu thong tin gio lam cac ngay trong tuan bac si.