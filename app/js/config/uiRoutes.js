module.exports = function($stateProvider, $urlRouterProvider, $httpProvider) {

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

  $stateProvider

  .state('authCallback', {
    url: '/authCallback?username&token',
    templateUrl: 'partials/auth.html',
    controller: 'AuthCtrl'
  })
  .state('dashboard', {
    url: '/dashboard',
    templateUrl: 'partials/dashboard.html',
    controller: 'DashboardCtrl'
  })

  $httpProvider.interceptors.push(require('../services/httpRequestInterceptor'));

};