const mongoose = require('mongoose');
const {Schema} = mongoose;
const workingScheduleSchema = new Schema({
    from_date: {
        type: Date,
        default: Date.now(),
    },
    date_work:{
        type: Date,
        default: Date.now(),
    },
    time_of_a_date:{
        type: String,
        default : ""
    },
    is_active: {
        type: Boolean,
        default: false
    }
}, {timestamp: true});
module.exports = mongoose.model('WorkingSchedule', workingScheduleSchema);
//luu thong tin gio lam cac ngay trong tuan bac si.