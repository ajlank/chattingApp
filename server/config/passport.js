const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
    require('dotenv').config()
    const passport=require('passport');
const users = require('../models/models');
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey =process.env.SECRET_KEY;
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    users.findOne({username: jwt_payload.username,userId:jwt_payload.userId}, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
           
        }
    });
}));