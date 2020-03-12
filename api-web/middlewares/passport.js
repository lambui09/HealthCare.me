const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET_KEY;

const PassportStrategy = new JwtStrategy(opts, function (jwt_payload, done) {
        console.log(jwt_payload);
        User.findOne({id: jwt_payload.sub}, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    });

exports = {
    PassportStrategy
};