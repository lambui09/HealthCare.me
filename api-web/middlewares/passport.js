const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer');
opts.secretOrKey = process.env.JWT_SECRET_KEY;

passport.use('jwt', new JwtStrategy(opts, function (jwt_payload, done) {
    Patient.findById(jwt_payload._id, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
    // Doctor.findById(jwt_payload._id, function (error, user) {
    //     if (error) {
    //         return done(error, false);
    //     }
    //     if (user) {
    //         return done(null, user);
    //     } else {
    //         return done(null, false);
    //     }
    // });
}));