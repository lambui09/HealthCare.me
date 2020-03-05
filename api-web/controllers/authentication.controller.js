const express = require('express');
const mongoose = require('mongoose');
const Patient = require('../models/Patient');
const jwt = require('jsonwebtoken');
const app = express();
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
                {success: false, errorMessage: error, statusCode: 500,}
            )
        }
        return res.json({success: true, data: newPatient, statusCode: 200})
    })
};



/**
 * //HTTP : /login
 * @param  {object} req HTTP request
 * @param  {object} res HTTP response
 * */
const logIn = async (req, res) => {
    //find user in db
    const queryRes = await Patient.findOne({
        phone_number: req.body.phone_number
    }, function (err, queryRes) {
        if (err) {
            return res.json({success: false, errorMessage: "server error", statusCode: 500,})
        }
        if (!queryRes) {
            return res.json({success: false, errorMessage: "Authentication failed. User not found.", statusCode: 403})
        } else {
            //create token
            const token = jwt.sign(queryRes.toJSON(), 'secretKey', {
                expiresIn: 1440
            });

            console.log(token);

            res.json({
                success: true, data: token, statusCode: 200
            })
        }
    })
};
module.exports = {
    signUp,
    logIn,
    resetPassword,
    logout,
    logInDoctor
};




