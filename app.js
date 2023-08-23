var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');
var nocache= require('nocache')
const bodyparser =require('body-parser');
const sessions = require('express-session');
const{v4:uuidv4}= require('uuid');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var hbs = require('hbs');
var app = express();

app.use(express.static(__dirname + '/public'));
//nocache
app.use(nocache());
// body parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}))

//session
app.use(sessions({
  secret: 'uuidv4',
  resave:false,
  saveUninitialized:true,
  cookie: { maxAge: 1000000 }

}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials')






app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
