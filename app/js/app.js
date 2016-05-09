require('angular/angular');
require('angular-ui-router');

var routesConfig = require('./config/uiRoutes');

//controllers
var dashboardCtrl = require('./controllers/dashboardCtrl');

//factories
var gameFactory = require('./services/GameFactory');

//instantiate app
var app = angular.module('Mahjong', ['ui.router', 'ngAnimate']);

//controllers
app.controller('dashboardCtrl', dashboardCtrl);

//factories
app.factory('GameFactory', gameFactory);

app.config(routesConfig);

