const mongoose = require('mongoose');
const {Schema} = mongoose;
const workingScheduleSchema = new Schema({
    from_date: {
        type: Date,
        default: Date.now(),
    },
    end_date: {
        type: Date,
        default: Date.now()
    },
    start_time: {
        type: String,
        default: "",
    },
    end_Time: {
        type: String,
        default: ""
    },
    list_time: {
        type: [String],
        default: [],
    },
    duration_default_appointment:{
        type: String,
        default : "30"
    },
    is_active: {
        type: Boolean,
        default: false
    }
}, {timestamp: true});
module.exports = mongoose.model('WorkingSchedule', workingScheduleSchema);
//luu thong tin gio lam cac ngay trong tuan bac si.