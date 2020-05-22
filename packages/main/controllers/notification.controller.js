const Notification = require('../models/Notification');

const getAllNotificationsByUser = async (req, res) => {
    const user_id = req.user._id;
    const role = req.user.user_id.role.toLowerCase();
    const filter = {
        [role]: user_id,
        isSent: role !== 'patient'
    };
    console.log(filter);
    try {
        const notiList = await Notification.find(filter).populate('patient').populate('doctor').lean();
        return res.status(200).json({
            status: true,
            data: {
                data: notiList,
                total_size: notiList.length
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            status: true,
            data: {},
        })
    }
};

module.exports = {
    getAllNotificationsByUser,
};