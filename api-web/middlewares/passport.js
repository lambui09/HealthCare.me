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

    let user;
    try {
        user = await User.findById(jwt_payload._id);
        console.log(user);
        if (!user) {
            throw new Error('User not found!');
        }
    } catch (error) {
        return done(error, false);
    }

    const Model = user.role === 'DOCTOR' ? Doctor : Patient;

    try {
        const userRole = await Model.findOne({
            user_id: user._id
        });
        console.log('userRole>>>>>>>>>>>>>>');
        console.log(userRole);
        if (!userRole) {
            throw new Error('User not found!');
        }
        return done(null, userRole);
    } catch (error) {
        return done(error, false);
    }
}));