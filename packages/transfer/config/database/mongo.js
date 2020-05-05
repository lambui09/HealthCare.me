const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}).then(() => {
    mongoose.connection.collection('doctors', (err, collection) => {
        if (!err) {
            collection.createIndex({
                location: "2dsphere"
            })
        }
    });
    mongoose.connection.collection('patients', (err, collection) => {
        if (!err) {
            collection.createIndex({
                location: "2dsphere"
            })
        }
    });
    console.log('MongoDB connected...');
});