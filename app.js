/**
 * Module dependencies.
 */
var fs = require('fs');
var path = require('path');
var http = require('http');
var express = require('express');
var cwd = process.cwd();
var config = require('./config');
var routes = require('./routes');
var _ = require('lodash');

var ui = require('./ui');
var macros = require('./macros');
//var staticDir = path.join(__dirname, 'public');

var app = express();
var velocity = config.viewEngine;
// all environments
app.use(express.favicon());
//app.use(express.logger());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);

// custom middleware
app.set('views', path.join(__dirname, 'views/templates'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'assets')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// 模板引擎使用vm
app.engine('vm', function(path, options, func) {
    try {
        var filepath;
        var velocityForString;
        var uiConfig = ui.config(path);
        var module = uiConfig.module;
        var body = uiConfig.body;
        var layout = uiConfig.layout;
        uiConfig.__head = ui.util.getHead(uiConfig.__head);
        uiConfig.__screen = ui.util.getScreen([module, body]);
        uiConfig.__foot = ui.util.getFoot(uiConfig.__foot);
        filepath = ui.util.getLayout([cwd, module, layout]);
        try {
            velocityForString = fs.readFileSync(filepath).toString();
            func(null, velocity.render(velocityForString, _.merge({ui: uiConfig}, options), macros));
        } catch (e) {
        }
    } catch (err) {
        console.log(err);
        func(err);
    }
});

// 设置端口
app.set('port', process.env.PORT || 3000);
var port = process.argv[2];
port = /^\d{4,5}$/.test(port) ? port : app.get('port');
// console.log('Listening on', port);

// controllers
routes(app);

http.createServer(app).listen(port, function() {
    console.log('Server listening on port ' + port);
})
    .on('error', function(err) {
    console.log('Error',err.code);
});
