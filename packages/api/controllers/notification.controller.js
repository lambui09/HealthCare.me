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
        body,
    } = req.body;
    try {

        const newNotification = new Notification();
        newNotification.title = title;
        newNotification.body = body;
        console.log(newNotification);
        const registrationToken = device_token;
        const options = notification_options;
        const message_notification = {
            notification: {
                title: newNotification.title,
                body: newNotification.body
            }
        };
        admin.messaging().sendToDevice(registrationToken, message_notification, options)
            .then(response => {
                res.status(200).send('Notification sent successfully' + response);
            }).catch(error => {
            console.log('error' + error)
        })
    } catch (error) {
        console.log(error);
    }

};
module.exports = {
    sendNotification,
};