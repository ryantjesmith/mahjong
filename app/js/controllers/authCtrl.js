
module.exports = function(AuthService, $scope, $location) {
    var self = $scope;

    checkParams();
    getCurrentUser();

    function checkParams(){
        var params = $location.search();

        if(params.username != "" && params.token != "")
            AuthService.setUser(params.username, params.token);
    }

    function getCurrentUser(){
        self.currentUser = AuthService.getUser();
    }
};