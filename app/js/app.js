require('angular/angular');
require('angular-ui-router');
require('ng-storage/ngStorage.min');


//config
var routesConfig = require('./config/uiRoutes');
var config = require('./config/config');

//controllers
var dashboardCtrl = require('./controllers/dashboardCtrl');

//instantiate app
var app = angular.module('Mahjong', ['ui.router', 'ngAnimate', 'ngStorage']);


//factories
app.factory('GameFactory', require('./services/GameFactory'));
app.factory('AuthService', require('./services/AuthService'));

//controllers
app.controller('dashboardCtrl', dashboardCtrl);

app.controller('loginCtrl', loginCtrl);


require('./constant/constant.js')(app);

app.config(routesConfig);


