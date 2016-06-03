module.exports = function (app) {
  app.config(function () {
      
      // TODO: config if you'd like

    })

    // This is run when Angular is bootstrapped
    .run(function ($rootScope, $templateCache, $state, $localStorage, AuthService, $location) {
      // TODO: remove when out of development
      $rootScope.$on('$viewContentLoaded', function () {

        $templateCache.removeAll();

      });

      // On every stateChange
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {

          if(toState.name !== 'login'){
              if(($localStorage.username === undefined || $localStorage.username === null) ) {
                   var params = $location.search();

                    if(params.username !== undefined){
                      if(params.username != "" && params.token != ""){
                          AuthService.setUser(params.username, params.token);
                          event.preventDefault();
                          $state.go(toState);
                      }
                    }
                    else{
                      event.preventDefault();
                      $state.go("login");
                    }
              }
          }
          else{
              if(($localStorage.username !== undefined) ) {

                   event.preventDefault();
                   $state.go('dashboard');
              }
          }


      })
    })
}