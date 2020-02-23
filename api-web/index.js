require('dotenv').config();
const express = require('express');
require('./config/database')

const app = express();

app.get('/', (req, res) => {
    return res.json({
        msg: 'aaaa'
    });
});

app.listen(3000, (err) => {
    if (err) throw err;
    console.log('Server is running...')
});