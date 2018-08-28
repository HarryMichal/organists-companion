var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var json = require('json');
const sqlite3 = require('sqlite3').verbose();

var config = require('./config/config');
var mainRoutes = require('./routes/main');
var apiRoutes = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/react-client/build')));
}

// Passport setup
require('./config/passport')(app);
app.use(session({secret: config.session.secret, resave: config.session.resave, saveUninitialized: config.session.saveUninit})); // session secret
app.use(passport.initialize());
app.use(passport.session());

// React production routine
app.use('/*', mainRoutes);

// API routes
app.use('/api', apiRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development'
    ? err
    : {};

  // render the error page
  res.status(err.status || 500);
  console.error("Error: " + err.status);
});

module.exports = app;
