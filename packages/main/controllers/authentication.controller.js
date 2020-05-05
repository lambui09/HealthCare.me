const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

const signup = async (req, res) => {
    const {
        phone_number,
        password,
        role,
    } = req.body;
    try {
        const passwordHashed = bcrypt.hashSync(password, 13);
        const newUser = new User();
        newUser.phone_number = phone_number;
        newUser.password = passwordHashed;
        newUser.role = role;
        await newUser.save();
        const Model = role === 'DOCTOR' ? Doctor : Patient;
        const newModel = new Model();
        newModel.phone_number = phone_number;
        newModel.user_id = newUser._id;
        const token = jwt.sign({
                _id: newUser._id,
            },
            process.env.JWT_SECRET_KEY, {
                expiresIn: process.env.TIME_EXPIRE_TOKEN,
            }
        );
        await User.findByIdAndUpdate(newUser._id, {
            is_exp: false,
        });
        await newModel.save();
        return res.json({
            success: true,
            data: {
                token: token,
                user: newModel,
            },
            statusCode: 200
        })
    } catch (error) {
        return res.json({
            success: false,
            errorMessage: error,
            statusCode: 500,
        });
    }
};

const login = async (req, res) => {
    const {
        phone_number,
        password,
    } = req.body;
    try {
        const user = await User.findOne({
            phone_number
        });
        if (!user) {
            throw new Error('Unauthenticated!');
        }
        const user_id = user._id;
        const passwordSaved = user.password;
        const isMatch = bcrypt.compareSync(password, passwordSaved);
        if (!isMatch) {
            throw new Error('Unauthenticated!');
        }
        const token = jwt.sign({
                _id: user_id,
            },
            process.env.JWT_SECRET_KEY, {
                expiresIn: process.env.TIME_EXPIRE_TOKEN,
            }
        );
        await User.findByIdAndUpdate(user_id, {
            is_exp: false,
        });
        return res.json({
            success: true,
            data: {
                token: token
            },
            statusCode: 200
        });
    } catch (error) {
        return res.json({
            success: false,
            errorMessage: "Authentication failed.",
            statusCode: 401,
        });
    }
};

const logout = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user.user_id, {
            is_exp: true
        });
        return res.json({
            success: true,
            data: 'Logout successfully',
            statusCode: 200,
        })
    } catch (error) {
        return res.json({
            success: false,
            errorMessage: 'Server error',
            statusCode: 500,
        });
    }
};

const resetPassword = async (req, res) => {
    const {
        phone_number,
    } = req.body;
    try {
        const user = await User.findOne({
            phone_number
        });
    } catch (error) {
        return res.json({
            success: false,
            errorMessage: 'Server error',
            statusCode: 500,
        });
    }
    const resetToken = jwt.sign({
        phone_number
    }, process.env.JWT_SECRET_KEY);
    return resetToken;
};
module.exports = {
    signup,
    login,
    logout,
    resetPassword,
};