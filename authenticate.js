// importing node modules 
const passport = require('passport');
const User = require('./models/users');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('./congif');

// importing Strategies 
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


// implementing the local strategy to verify the users
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// implementing JsonWebTokens

// when supplied with the user, this function creates a token with given values
exports.getToken = function(user){
    return jwt.sign(user, config.secretKey, {expiresIn: 3600});
};

// defining options for the JsonWebToken
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

// passport uses the define JwtStrategy and returns a callback function
exports.jwtPassport = passport.use(new JwtStrategy(opts, 
    (jwt_payload, done) => {
        console.log(jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if(err){
                return done(err, false);
            }
            else if(user){
                return done(null, user);
            }
            else{
                return done(null, false);
            }
        });
    }));

// a function to authenticate a user using jwt strategy
exports.verifyUser = passport.authenticate('jwt', {session:false});