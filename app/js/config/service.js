module.exports = function(app) {

  app.factory('GameService',    require('../services/gameService'));
  app.factory('AuthService',    require('../services/authService'));

}
