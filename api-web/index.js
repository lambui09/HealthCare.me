require('dotenv').config();
const express = require('express');
require('./config/database');

const app = express();

app.get('/', (req, res) => {
    return res.json({
        msg: 'aaaa'
    });
});
app.post('/login', (req, res) =>{

});
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