const {
    admin
} = require('../server.js');
const Notification = require('../models/Notification');
const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24,
};

const sendNotification = async (req, res) => {
    const {
        device_token,
        title,
        content,
    } = req.body;
    try {
        const newNotification = new Notification();
        newNotification.title = title;
        newNotification.content = content;

    } catch (error) {
        console.log(error);
    }
    const registrationToken = device_token;
    const options = notification_options;
    admin.messaging().sendToDevice(registrationToken, newNotification, options)
        .then(response => {
            res.status(200).send('Notification sent successfully' + response);
        }).catch(error => {
        console.log('errorroror' + error)
    })
};
module.exports = {
    sendNotification,
};