const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//we don't use require that can run tests
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(
    new GoogleStrategy(
    {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        // callbackURL: 'http://localhost:5000/auth/google/callback',
        callbackURL: '/auth/google/callback',
        // proxy: true
    }, (accessToken, refreshToken, profile, done)=>{
        User.findOne({googleId: profile.id})
            .then(existUser=>{
                if(existUser){
                    console.log('exist');
                    done(null, existUser);//err: null/
                }else{
                    console.log('new User was saved ');
                    new User({googleId: profile.id})
                        .save()
                        .then(user => done(null, user));

                }
            });

        new User({googleId: profile.id}).save()
    })
);
