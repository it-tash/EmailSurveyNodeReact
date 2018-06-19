const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
// the order: first define User then passport
require('./models/User');
require('./services/passport');

mongoose.connect('mongodb://localhost/emailSurvey');
mongoose.Promise = global.Promise;

const app = express();

// in myEngine i used express-session
app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: [keys.cookieKey]
    })
);
// tell passport to use cookie
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);




const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>console.log( 'listen at port:' + PORT));

