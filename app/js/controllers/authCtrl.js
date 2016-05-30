
module.exports = function ($scope, $stateParams, $state, $localStorage) {

  $scope.auth = "Auth";

  // TODO: inject into header by means of an interceptor
  console.log($stateParams.username);

  $localStorage.username = $stateParams.username;
  $localStorage.token = $stateParams.token;

  $state.go('home');

}