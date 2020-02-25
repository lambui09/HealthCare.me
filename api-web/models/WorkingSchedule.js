const mongoose = require('mongoose');
const {Schema} = mongoose;
const workingScheduleSchema = new Schema({
    from_date: {
        type: Date,
        default: Date.now(),
    },
    hours: {
        type: String,
        default: ""
    }
}, {timestamp: true});
module.exports = mongoose.model('WorkingSchedule', workingScheduleSchema);
//luu thong tin gio lam cac ngay trong tuan bac si.