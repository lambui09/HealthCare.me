const express = require('express');
const mongoose = require('mongoose');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const jwt = require('jsonwebtoken');
const app = express();
const validateAuth = require('../validationUtils/auth');
const _ = require('lodash');

const validateResetPasswordInput = validateAuth.resetPassword();
/**
 * // http: /signup
 * @param  {object} req HTTP request
 * @param  {object} res HTTP response
 * */
const signup = async (req, res) => {
    const newPatient = new Patient();
    newPatient.phone_number = req.body.phone_number;
    newPatient.password = req.body.password;
    newPatient.confirm_password = req.body.confirm_password;
    await newPatient.save(function (error) {
        if (error) {
            return res.json(
                {success: false, errorMessage: error, statusCode: 500,}
            )
        }
        const newPatientResponse = newPatient.toObject();
        const dataPatient = _.omit(newPatientResponse, 'password', 'confirm_password');

        // const newPatientResponse = Patient.findOne(phone_number).select({password: 0, confirm_password: 0});
        console.log(newPatientResponse);
        return res.json({success: true, data: dataPatient, statusCode: 200})
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
        if (err) {
            return res.json({success: false, errorMessage: "server error", statusCode: 500,})
        }
        if (!patient) {
            return res.json({success: false, errorMessage: "Authentication failed. User not found.", statusCode: 403})
        } else {
            const data = patient.toJSON();
            const token = jwt.sign({
                _id: data._id,
            }, process.env.JWT_SECRET_KEY, {
                expiresIn: process.env.TIME_EXPIRE_TOKEN,
            });
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
    console.log(req.user);
    const errors = {};
    try {
        await Patient.findByIdAndUpdate(req.user._id, {is_exp: true});
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
    try {
        patient = Patient.findOne({
            phone_number,
        });
    } catch (error) {
        console.log(error)
    }
    const resetToken = jwt.sign({
        phone_number
    }, process.env.JWT_SECRET_KEY);
};
/**
 * sign up of doctor
 * http: /signupOfDoctor
 * */

const signUpDoctor = async (req, res) => {
    const newDoctor = new Doctor();
    newDoctor.phone_number = req.body.phone_number;
    newDoctor.password = req.body.password;
    newDoctor.confirm_password = req.body.confirm_password;
    newDoctor.role = "DOCTOR";
    await newDoctor.save(function (error) {
        if (error) {
            return res.json(
                {success: false, errorMessage: error, statusCode: 500,}
            )
        }
    });
    const newDoctorResponse = newDoctor.toObject();
    const dataDoctor = _.omit(newDoctorResponse, 'password', 'confirm_password');

    // const newPatientResponse = Patient.findOne(phone_number).select({password: 0, confirm_password: 0});
    console.log(newDoctorResponse);
    return res.json({success: true, data: dataDoctor, statusCode: 200})
};

const loginDoctor = async (req, res) =>{
    const doctor = await Doctor.findOne({
        phone_number: req.body.phone_number
    }, function (err, doctor) {
        if (err) {
            return res.json({success: false, errorMessage: "server error", statusCode: 500,})
        }
        if (!doctor) {
            return res.json({success: false, errorMessage: "Authentication failed. User not found.", statusCode: 403})
        } else {
            const data = doctor.toJSON();
            const token = jwt.sign({
                _id: data._id,
            }, process.env.JWT_SECRET_KEY, {
                expiresIn: process.env.TIME_EXPIRE_TOKEN,
            });
            res.json({
                success: true, data: token, statusCode: 200
            })
        }
    })
};
const logoutDoctor = async (req, res) => {
    console.log(req.user);
    const errors = {};
    try {
        await Doctor.findByIdAndUpdate(req.user._id, {is_exp: true});
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

module.exports = {
    signup,
    login,
    resetPassword,
    logout,
    signUpDoctor,
    loginDoctor,
    logoutDoctor,

};




