module.exports = function (app) {
  app.config(function () {
      // TODO: config if you'd like

    })

    // This is run when Angular is bootstrapped
    .run(function ($rootScope, $templateCache, $state) {
      // TODO: remove when out of development
      $rootScope.$on('$viewContentLoaded', function () {
        console.log("hoi");
        $templateCache.removeAll();
        // This shows the sidebar
        //$state.go('sidebar.loggedIn');
        // $state.go('wrapper.content');
      });

      // TODO: this won't work.
      $rootScope.$on('stateChangeStart', function (event, toState, toParams) {
        alert();
        if (toState.data.preload) {
          $state.go(toState);
        }
      })
    })
}