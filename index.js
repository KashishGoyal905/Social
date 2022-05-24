const express = require('express');
// requiring cookie parser  {for reading and writin into cookies}  // not required in passport
const cookieParser = require('cookie-parser')
const app = express();
// require("dotenv").config();
// const port = process.env.PORT || 8000;
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie 
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
// 
// to store cookies in db
const MongoStore = require('connect-mongo');
// scss middleware for styling 
const sassMiddleware = require('node-sass-middleware');

// sass documentation
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// using cookie parser 
app.use(cookieParser());
app.use(express.urlencoded());

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');



// creating encryption thing for id that pass to cookie using express session(which encrypt the cookie)
// mongostore is used to store cookie in db 
app.use(session({
    name: 'codeial',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/codeial_development',
        autoRemove: 'disabled'
    }, function (err) {
        console.log(err || 'connect mongo error');
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes'));

// listening port
app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});