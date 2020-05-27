const Notification = require('../models/Notification');

const getAllNotificationsByUser = async (req, res) => {
    const user_id = req.user._id;
    const role = req.user.user_id.role.toLowerCase();
    const filter = {
        [role]: user_id,
        isSent: role !== 'patient'
    };
    try {
        const notiList = await Notification.find(filter).sort({ 'updatedAt': -1 }).populate('patient').populate('doctor').lean();
        return res.status(200).json({
            status: true,
            data: {
                data: notiList,
                total_size: notiList.length
            }
        })
    } catch (error) {
        return res.status(200).json({
            status: true,
            data: {},
        })
    }
};

const countNotificationUnseen = async (req, res) => {
    const user_id = req.user.user_id._id;
    const role = req.user.user_id.role.toLowerCase();
    const filter = {
        [role]: user_id,
        isSent: role !== 'patient',
        has_read: false
    };
    try {
        const countNotification = await Notification.countDocuments(filter);
        return res.status(200).json({
            status: true,
            data: {
                count: countNotification || 0
            },
        });
    } catch (error) {
        return res.status(200).json({
            status: true,
            data: {
                count: 0
            },
        });
    }
}

module.exports = {
    getAllNotificationsByUser,
    countNotificationUnseen,
};