const {admin} = require('../server.js');
const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24,
};

const  sendNotification = async (token, message) =>{
    await admin.messaging().sendToDevice(token, message, notification_options)
        .then(response => {
            console.log('Successfully sent message:', response)
        })
        .catch(error => {
            console.log('error roi ban oi', error)
        })
};
module.exports = sendNotification;