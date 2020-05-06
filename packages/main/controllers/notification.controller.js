const Notification = require('../models/Notification');

const getAllNotificationsByUser = (req, res) => {
    const user_id = req.user._id;
    try {
        const notiList = Notification.find({
            '$or': {
                patient: user_id,
                doctor: user_id,
            }
        }).populate('patient').populate('doctor').lean();

        return res.status(200).json({
            status: true,
            data: notiList,
        })
    } catch (e) {
        return res.status(200).json({
            status: true,
            data: [],
        })
    }
};

module.exports = {
    getAllNotificationsByUser,
};