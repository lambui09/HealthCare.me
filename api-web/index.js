require('dotenv').config();
const express = require('express');
require('./config/database');
const AuthRouter = require('./routes/auth');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    return res.json({
        msg: 'aaaa'
    });
});
app.use('/auth',AuthRouter);
// app.get('/api/v1/signup', (req, res) =>{
//     return res.json({
//         msg: 'input signup'
//     });
// });
// app.get('/api/v1/login', (req, res) =>{
//     return res.json({
//         msg: 'input login'
//     });
// });
// app.get('/api/v1/logout', (req, res) =>{
//     return res.json({
//         msg: 'input logout'
//     });
// });
app.listen(3000, (err) => {
    if (err) throw err;
    console.log('Server is running...')
});