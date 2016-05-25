module.exports = function ($rootScope, $localStorage, $q) {
  var service = this;

  service.request = function (config) {
    console.log('Log from the HTTP interceptor');
    console.log(config.headers);

    // Check if localStorage.jwt is set.
    var access_token = $localStorage.token,
      access_username = $localStorage.username;
    // Set the token on the header on authorization
    if (access_token && access_username) {
      config.headers['x-token'] = access_token;
      config.headers['x-username'] = access_username;

      console.log(config.headers['x-token']);
      console.log(config.headers['x-username']);
    }
    return config;
  };

  service.responseError = function (response) {
    if (response.status === 401) {
      $rootScope.$broadcast('unauthorized');
    }
    return $q.reject(response);
  }

  return this;
}