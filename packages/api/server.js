const admin = require('firebase-admin');
const serviceAccount = require('./healthy-care-9834a-firebase-adminsdk-yco1r-634413df99');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://healthy-care-9834a.firebaseio.com"
});
module.exports.admin = admin;
