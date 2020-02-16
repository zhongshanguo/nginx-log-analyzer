var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/debug', require('./routes/debug'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404);
    next();
});

// error handler
app.use(function (err, req, res, next) {
    res.json({error: err, message: err.message, info: err.toString()});
});

module.exports = app;
