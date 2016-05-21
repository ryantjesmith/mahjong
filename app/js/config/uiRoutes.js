module.exports = function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('login', {
    url: '/',
    templateUrl: './partials/login.html',
    controller: 'loginCtrl'
  })

  .state('dashboard', {
    url: '/dashboard',
    templateUrl: './partials/dashboard.html',
    controller: 'dashboardCtrl'
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

};