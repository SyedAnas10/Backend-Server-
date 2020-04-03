// Importing Node Modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

// defining routers for each component
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');

// setting up mongoose client with the already running mongodb server
const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);
connect.then((db) => {
  console.log('Succesfully connected to Server!');
}, (err)=>{
    console.log('There is an error \n' + err);
  });

// initialising app with express
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// express middleware from which the app would run sequentially
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('12345-67890-09876-54321'));

// implementing basic authentication 
function auth(req, res, next) {
  if(!req.signedCookies.user){
    var authHeader = req.headers.authorization;
    
    if(!authHeader){
      var err = new Error('Authentication failed!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      return next(err);
    }
    
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    if( auth[0] === 'admin' && auth[1] === 'password'){
      res.cookie('user','admin', {signed:true});
      next();
    }
    else{
      var err = new Error('Authentication failed!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      return next(err);
    }
  }
  else{
    next();
  } 
}
app.use(auth);

// setting up express router to serve static pages in public folder
app.use(express.static(path.join(__dirname, 'public')));

// setting up routers to use with corresponding endpoint
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
