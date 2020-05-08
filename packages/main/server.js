const admin = require('firebase-admin');
const serviceAccount = require('./health-care-276516-firebase-adminsdk-c2cwl-09c7c12f53');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://health-care-276516.firebaseio.com"
});
module.exports.admin = admin;
