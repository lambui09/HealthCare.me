const express = require('express');
const mongoose = require('mongoose');
const Patient = require('../models/Patient');
const jwt = require('jsonwebtoken');
const app = express();
const validateAuth = require('../validationUtils/auth');

const validateResetPasswordInput = validateAuth.resetPassword();
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
const login = async (req, res) => {
    //find user in db
    const patient = await Patient.findOne({
        phone_number: req.body.phone_number
    }, function (err, patient) {
        //save patient
        // queryRes = req.user;
        if (err) {
            return res.json({success: false, errorMessage: "server error", statusCode: 500,})
        }
        if (!patient) {
            return res.json({success: false, errorMessage: "Authentication failed. User not found.", statusCode: 403})
        } else {
            //create token
            const token = jwt.sign(patient.toJSON(), 'secretKey', {
                expiresIn: 1440
            });

            console.log(token);

            res.json({
                success: true, data: token, statusCode: 200
            })
        }
    })
};

/**
 * //HTTP : /logout
 * @param  {object} req HTTP request
 * @param  {object} res HTTP response
 * */
const logout = async (req, res) => {
    const errors = {};

    try {
        await Patient.findByIdAndUpdate(use._id, {is_exp: true});
    } catch (error) {
        console.log(error);
        errors.error = 'Can not logout. Please try again later!';
        return res.status(500).json({
            success: false,
            errors,
        });
    }
    return res.status(200).json({
        success: true,
        data: {
            notify: 'Logout successfully',
        }
    })
};

const resetPassword = async (req, res) => {
    const {
        errors,
        isvalid,
    } = validateResetPasswordInput(req.body);
    const {
        phone_number,
    } = req.body;
    if (!isvalid) {
        return res.status(400).json({
            success: false,
            errors,
        });
    }
    let patient = null;
    try{
        patient = Patient.findOne({
            phone_number,
        });
    }catch (error) {
        console.log(error)
    }
    const resetToken = jwt.sign({
        phone_number
    }, 'secretKey');

};
module.exports = {
    signUp,
    login,
    resetPassword,
    logout
};




