
module.exports = function (app) {
  app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise('');


    $stateProvider

    .state('login', {
      url: '/',
      templateUrl: '../partials/login.html'
    })

    .state('dashboard', {
      url: '/dashboard',
      templateUrl: '../partials/dashboard.html',
      controller: 'DashboardCtrl'
    })

    $httpProvider.interceptors.push(require('../services/httpInterceptor'));



  });


}