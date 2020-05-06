const {admin} = require('../server.js');
const Notification = require('../models/Notification');
const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24,
};

const sendNotification = async (device_token, data, requestMode) => {
    try {

        const registrationToken = device_token;
        const options = notification_options;
        const notification_payload = {
            notification: {
                title: data.title,
                body: data.body
            },
            data
        };
        console.log(notification_payload);
        admin.messaging().sendToDevice(registrationToken, notification_payload, options)
            .then(async (response) => {
                console.log('RES: ', response);
                let newNotification = new Notification();
                newNotification.title = data.title;
                newNotification.body = data.body;
                newNotification.patient = requestMode ? data.sender : data.receiver;
                newNotification.doctor = !requestMode ? data.sender : data.receiver;
                newNotification.isSent = requestMode;
                await newNotification.save();
            }).catch(error => {
            console.log('error' + error)
        })
    } catch (error) {
        console.log(error);
    }

};
module.exports = sendNotification;