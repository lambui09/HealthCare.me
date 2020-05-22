const Notification = require('../models/Notification');

const getAllNotificationsByUser = async (req, res) => {
    const user_id = req.user._id;
    console.log(req.user);
    try {
        const notiList = await Notification.find({
            '$or': [{patient: user_id},
                {doctor: user_id,
            }]
        }).populate('patient').populate('doctor').lean();
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