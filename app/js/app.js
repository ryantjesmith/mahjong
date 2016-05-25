require('angular/angular');
require('ngstorage/ngStorage.min');
require('angular-ui-router');


//instantiate app
var app = angular.module('Mahjong', ['ui.router', 'ngRoute', 'ngStorage', 'ngAnimate']);


require('./constant/constant.js')(app);

//controllers
app.controller('DashboardCtrl', require('./controllers/dashboardCtrl'));
app.controller('AuthCtrl', require('./controllers/authCtrl'));

//factories
app.factory('GameFactory', require('./services/gameFactory'));

//Routes
app.config(require('./config/uiRoutes'));

