const User = require('../models/User');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const jwt = require('jsonwebtoken');
const validateAuth = require('../validationUtils/auth');
const _ = require('lodash');

const validateResetPasswordInput = validateAuth.resetPassword();
/**
 * // http: /signup
 * @param  {object} req HTTP request
 * @param  {object} res HTTP response
 * */
const signup = async (req, res) => {
    const {
        phone_number,
        password,
        confirm_password,
        role,
    } = req.body;

    const newUser = new User();
    newUser.phone_number = phone_number;
    newUser.password = password;
    newUser.confirm_password = confirm_password;
    newUser.role = role;

    try {
        await newUser.save();
    } catch (error) {
        return res.json({
            success: false,
            errorMessage: error,
            statusCode: 500,
        });
    }

    const Model = role === 'DOCTOR' ? Doctor : Patient;
    const newModel = new Model();
    newModel.phone_number = phone_number;
    newModel.user_id = newUser._id;

    try {
        await newModel.save();
    } catch (error) {
        return res.json({
            success: false,
            errorMessage: error,
            statusCode: 500,
        });
    }

    return res.json({
        success: true,
        data: newModel,
        statusCode: 200
    })
};

/**
 * //HTTP : /login
 * @param  {object} req HTTP request
 * @param  {object} res HTTP response
 * */
const login = async (req, res) => {
    const {
        phone_number
    } = req.body;

    try {
        const user = await User.findOne({
            phone_number: phone_number
        });

        if (!user) {
            return res.json({
                success: false,
                errorMessage: "Authentication failed. User not found.",
                statusCode: 403
            })
        }

        const data = user.toJSON();
        const token = jwt.sign(
            {
                _id: data._id,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: process.env.TIME_EXPIRE_TOKEN,
            }
        );
        res.json({
            success: true,
            data: token,
            statusCode: 200
        })
    } catch (error) {
        return res.json({
            success: false,
            errorMessage: "server error",
            statusCode: 500,
        });
    }
};

/**
 * //HTTP : /logout
 * @param  {object} req HTTP request
 * @param  {object} res HTTP response
 * */
const logout = async (req, res) => {
    const errors = {};
    try {
        await User.findByIdAndUpdate(req.user.user_id, {
            is_exp: true
        });
    } catch (error) {
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
    let user = null;
    try {
        user = User.findOne({
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
            return res.json({
                success: false,
                errorMessage: error,
                statusCode: 500,
            })
        }
    });
    const newDoctorResponse = newDoctor.toObject();
    const dataDoctor = _.omit(newDoctorResponse, 'password', 'confirm_password');

    // const newPatientResponse = Patient.findOne(phone_number).select({password: 0, confirm_password: 0});
    console.log(newDoctorResponse);
    return res.json({
        success: true,
        data: dataDoctor,
        statusCode: 200
    })
};

const loginDoctor = async (req, res) => {
    const doctor = await Doctor.findOne({
        phone_number: req.body.phone_number
    }, function (err, doctor) {
        if (err) {
            return res.json({
                success: false,
                errorMessage: "server error",
                statusCode: 500,
            })
        }
        if (!doctor) {
            return res.json({
                success: false,
                errorMessage: "Authentication failed. User not found.",
                statusCode: 403
            })
        } else {
            const data = doctor.toJSON();
            const token = jwt.sign({
                _id: data._id,
            }, process.env.JWT_SECRET_KEY, {
                expiresIn: process.env.TIME_EXPIRE_TOKEN,
            });
            res.json({
                success: true,
                data: token,
                statusCode: 200
            })
        }
    })
};
const logoutDoctor = async (req, res) => {
    console.log(req.user);
    console.log(req.user._id);
    const errors = {};
    try {
        await Doctor.findByIdAndUpdate(req.user._id, {
            is_exp: true
        });
    } catch (error) {
        console.log(error);
        errors.error = 'Can not logout. Please try again later!';
        return res.status(500).json({
            success: false,
            errors,
        });
    }
    console.log(Doctor.findByIdAndUpdate(req.user._id, {
        is_exp: true
    }));
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