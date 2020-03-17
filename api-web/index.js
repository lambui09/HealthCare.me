require('dotenv').config();
const express = require('express');
require('./config/database');
const AuthRouter = require('./routes/auth');
const AppointmentRouter = require('./routes/appointment');
const bodyParser = require('body-parser');
require('./middlewares/passport');
const passport = require('passport');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());

app.get('/', (req, res) => {
    return res.json({
        msg: 'aaaa'
    });
});

app.use('api/v1/auth', AuthRouter);
app.use('api/v1/appointments', AppointmentRouter);

app.listen(3000, (err) => {
    if (err) throw err;
    console.log('Server is running...')
});
