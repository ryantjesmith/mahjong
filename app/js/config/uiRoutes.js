module.exports = function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('dashboard', {
    url: '/',
    templateUrl: './partials/dashboard.html',
    controller: 'dashboardCtrl'
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

};