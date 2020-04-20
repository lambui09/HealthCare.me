require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./config/database');
require('./middlewares/passport');


const AuthRouter = require('./routes/auth');
const AppointmentRouter = require('./routes/appointment');
const WorkingScheduleRouter = require('./routes/working_schedule');
const DoctorRouter = require('./routes/doctor');
const FavoriteRouter = require('./routes/favorite');
const CommentRouter = require('./routes/comment');
const PatientRouter = require('./routes/patient');
const SurveySymptomRouter = require('./routes/surveySymptom');
const NotificationRouter = require('./routes/notification');
const SpecialistRouter = require('./routes/specialist');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());

app.get('/api/v1', (req, res) => {
    return res.json({
        msg: 'aaaa'
    });
});

app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/appointments', AppointmentRouter);
app.use('/api/v1/working-schedule', WorkingScheduleRouter);
app.use('/api/v1/doctors', DoctorRouter);
app.use('/api/v1/favorites', FavoriteRouter);
app.use('/api/v1/comments', CommentRouter);
app.use('/api/v1/patients', PatientRouter);
app.use('/api/v1/survey-symptoms', SurveySymptomRouter);
app.use('/api/v1/notifications', NotificationRouter);
app.use('/api/v1/specialists', SpecialistRouter);

app.listen(3000, (err) => {
    if (err) throw err;
    console.log('Server is running...')
});
