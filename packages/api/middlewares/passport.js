const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const User = require('../models/User');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer');
opts.secretOrKey = process.env.JWT_SECRET_KEY;

passport.use('jwt', new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await User.findOne({
            _id: jwt_payload._id,
            is_exp: false,
        });
        if (!user) {
            throw new Error('User not found!');
        }
        const Model = user.role === 'DOCTOR' ? Doctor : Patient;
        const userRole = await Model.findOne({
            user_id: user._id
        });
        if (!userRole) {
            throw new Error('User not found!');
        }
        return done(null, userRole);
    } catch (error) {
        return done(error, false);
    }
}));