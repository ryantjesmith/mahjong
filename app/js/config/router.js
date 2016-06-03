
module.exports = function (app) {
  app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise('/login');


    $stateProvider

    .state('login', {
      url: '/login',
      templateUrl: '../partials/login.html'
    })
    .state('logout', {
        url: '/logout',
        controller: function($localStorage, $state){
            delete $localStorage.username;
            delete $localStorage.token;

            $state.go('login');
        }
    })

    .state('dashboard', {
      url: '/dashboard',
      templateUrl: '../partials/dashboard.html',
      controller: 'DashboardCtrl'
    })

    .state('game', {
      url: '/game/:gameId',
      templateUrl: '../partials/game.html',
      controller: 'GameCtrl'
    })

    $httpProvider.interceptors.push(require('../services/httpInterceptor'));



  });


}