module.exports = function (app) {
  app.config(function () {
      
      // TODO: config if you'd like

    })

    // This is run when Angular is bootstrapped
    .run(function ($rootScope, $templateCache, $state) {
      // TODO: remove when out of development
      $rootScope.$on('$viewContentLoaded', function () {

        $templateCache.removeAll();

      });

      // TODO: this won't work.
      $rootScope.$on('stateChangeStart', function (event, toState, toParams) {

          // TODO: check if logged in
          
      })
    })
}