const express = require('express');
const mongoose = require('mongoose');
const Patient = require('../models/Patient');
const jwt = require('jsonwebtoken');
const app = express();
/**
 * @name signup
 * @description
 * Handle signup user account.
 *
 * @param  {object} req HTTP request
 * @param  {object} res HTTP response
 */
// app.post('/signup', function (req, res){
//     Patient.create(
//         {
//             phone_number : req.body.phone,
//             password : req.body.pass,
//             confirm_password : req.body.confirm_password
//         },
//         function (err, patient) {
//             if (err) return res.status(500).json.send("Server have problem");
//             //create token
//             var token = jwt.sign({id : user_id});
//             res.status(200).json.send({auth: true
//             , token: token})
//         }
//     )
// });
/**
 * // http: /signup
 * @param  {object} req HTTP request
 * @param  {object} res HTTP response
 * */
const signUp = async (req, res) => {
    const newPatient = new Patient();
    newPatient.phone_number = req.body.phone_number;
    newPatient.password = req.body.password;
    newPatient.confirm_password = req.body.confirm_password;
    newPatient.save(function (error) {
        if (error) {
            return res.json(
                {success: false, statusCode: 500, errorMessage: error}
            )
        }
        return res.json({success: false, message: "success", data: newPatient, statusCode: 200})
    })
};

/**
 * //HTTP : /login
 * @param  {object} req HTTP request
 * @param  {object} res HTTP response
 * */
const logIn = async (req, res) => {

};
module.exports = {
    signUp,
    logIn
};




