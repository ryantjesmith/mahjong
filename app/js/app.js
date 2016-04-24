require('angular/angular');
require('angular-ui-router');

// Create your app
var app = angular.module('Mahjong', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  $stateProvider

  .state('dashboard', {
    url: '/',
    templateUrl: './partials/dashboard.html',
    controller: 'dashboardCtrl'
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});

var dashboardCtrl = require('controllers/dashboardCtrl');
app.controller('dashboardCtrl', dashboardCtrl);
