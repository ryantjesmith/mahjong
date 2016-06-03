module.exports = function(app) {

  app.controller('DashboardCtrl',    require('../controllers/dashboardCtrl'));
  app.controller('GameCtrl',    require('../controllers/gameCtrl'));

}