const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Patient =  require('../models/Patient');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.urlencoded({extended: true}));
app.post('/', function (req, rest) {

    
});
/**
 * @name signup
 * @description
 * Handle signup user account.
 *
 * @param  {object} req HTTP request
 * @param  {object} res HTTP response
 */
app.post('/signup', function (req, res) {
    Patient.create(
        {
            phone_number : req.body.phone,
            password : req.body.pass,
            confirm_password : req.body.confirm_password
        },
        function (err, patient) {
            if (err) return res.status(500).send("Server have problem");
            //create token
            var token = jwt.sign({id : user_id});
            res.status(200).send({auth: true
            , token: token})
        }
    )
});
module.exports = router;




