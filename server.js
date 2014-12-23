var path = require('path');
var express = require('express');
var sassMiddleware = require('node-sass-middleware');
var utils = require('./utils');
var app = express();
var server = require('http').Server(app);
var port = process.env.PORT || 8080;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(
    sassMiddleware({
        src: path.join(__dirname, 'scss'),
        dest: path.join(__dirname, 'public/static/css'),
        prefix: '/static/css',
        outputStyle: 'compressed'
    })
);

app.use('/static', express.static(path.join(__dirname, 'public/static')));

app.get('/*', function (req, res) {
    if (req.url == '/') {
        res.redirect('/' + utils.randomString(5));
    }
    res.sendFile((path.join(__dirname, 'public', 'index.html')));
});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = server;