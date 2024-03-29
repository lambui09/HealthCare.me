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
    device_token,
  } = req.body;
  try {
    const passwordHashed = bcrypt.hashSync(password, 13);

    const dataFetched = await User.findOne({
      phone_number
    });

    if (dataFetched) {
      throw new Error('Phone number is already existed!');
    }

    const newUser = new User({
      phone_number,
      password: passwordHashed,
      role,
      device_token
    });
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
    console.log(error);
    return res.status(500).json({
      success: false,
      errorMessage: {
        error: error.message
      },
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
    let userItem = null;
    if (user.role === 'DOCTOR') {
      userItem = await Doctor.findOne({user_id: user_id}).lean();
    } else {
      userItem = await Patient.findOne({user_id: user_id}).lean();
    }
    const id_login = userItem._id;
    return res.status(200).json({
      success: true,
      data: {
        token: token,
        user_id: id_login,
      },
      statusCode: 200
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      errorMessage: "Authentication failed.",
      statusCode: 401,
    });
  }
};

const logout = async (req, res) => {
  const user_id = req.user.user_id._id;
  try {
    await User.findByIdAndUpdate(user_id, {
      is_exp: true
    });
    return res.status(200).json({
      success: true,
      data: 'Logout successfully',
      statusCode: 200,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      errorMessage: 'Server error',
      statusCode: 500,
    });
  }
};

const resetPassword = async (req, res) => {
  const {
    phone_number,
    password,
  } = req.body;
  try {
    const passwordHashed = bcrypt.hashSync(password, 13);
    await User.findOneAndUpdate(
      {phone_number},
      {password: passwordHashed}
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      errorMessage: 'Server error',
      statusCode: 500,
    });
  }

  return res.status(200).json({
    success: true,
    data: 'Reset password successfully',
    statusCode: 200,
  })
};
module.exports = {
  signup,
  login,
  logout,
  resetPassword,
};