const JWTStrategy = require('passport-jwt').Strategy;
const {ExtractJwt} = require('passport-jwt');
const passport = require('passport');
const User = require('../models/User');
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts._secretOrKeyProvider = process.env.JWT_SECRET_KEY;
const passportStrategy = (passportInit) => {
    passportInit.use(new JWTStrategyotps(opts, async (jwtPayload, done) => {
        let user = null;
        try {
            user = User.findOne({_id: jwtPayload._id, is_exp: false});

        } catch (error) {
            console.log(error);
            return done(null, false)

        }
        if (!user) {
            return done(null, false)
        }
        return done(null, user)

    }))
};

const passportAuthenticate = (req, res, next) => passport.authenticate('jwt',
    {
        session: false
    }, (err, user, info) => {
        const errors = {};
        if (err) {
            console.log(err);
            errors.error = 'ANOTHORIZED_USER';
            return res.status(401).json({
                success: false,
                errors,
            })
        }
        if (!user) {
            errors.error = 'ANOTHORIZED_USER';
            return res.status(401).json({
                success: false,
                errors,
            })
        }
        req.user = user;
        next();
    })(req, res, next);

module.exports = {
    passportStrategy,
    passportAuthenticate,
};