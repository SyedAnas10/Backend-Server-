// Importing Node Modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var authenticate = require('./authenticate');
var FileStore = require('session-file-store')(session);
var config = require('./congif');

// defining routers for each component
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');
var uploadRouter = require('./routes/uploadRouter');
var favoriteRouter = require('./routes/favoriteRouter');

// setting up mongoose client with the already running mongodb server
const url = config.mongoUrl;
const connect = mongoose.connect(url);
connect.then((db) => {
  console.log('Succesfully connected to Server!');
}, (err)=>{
    console.log('There is an error \n' + err);
  });

// initialising app with express
var app = express();

// redirecting all insecure requests on server on port:3000 to secure port:3443
app.all('*', (req, res, next) => {
  if(req.secure){
    return next();
  }
  else{
    res.redirect(307, 'https://' +req.hostname+ ':' +app.get('secPort')+ req.url);
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// express middleware from which the app would run sequentially
app.use(logger('dev')); // uses morgan package
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser('12345-67890-09876-54321'));  this line is used only when to put cookies on the server 

app.use(passport.initialize()); // uses passport package

// setting up routers to be used without logging in or any signup required
app.use('/', indexRouter);
app.use('/users', usersRouter);
// setting up express router to serve static pages in public folder
app.use(express.static(path.join(__dirname, 'public')));
// setting up routers to use with corresponding endpoint
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);
app.use('/imageUpload', uploadRouter);
app.use('/favorites', favoriteRouter);

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
