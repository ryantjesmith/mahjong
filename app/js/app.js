require('angular/angular');
require('angular-ui-router');

var routesConfig = require('./config/uiRoutes');

//controllers
var dashboardCtrl = require('./controllers/dashboardCtrl');
var loginCtrl = require('./controllers/loginCtrl');

//instantiate app
var app = angular.module('Mahjong', ['ui.router', 'ngAnimate']);


//factories
app.factory('GameFactory', require('./services/GameFactory'));
app.factory('AuthService', require('./services/AuthService'));

//controllers
app.controller('dashboardCtrl', dashboardCtrl);
app.controller('loginCtrl', loginCtrl);



app.config(routesConfig);

