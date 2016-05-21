module.exports = function () {

    var self = this;

    self.user = {
        username: '',
        token: ''
    };

    return {

        getUser: function(){
            this.user = angular.fromJson(sessionStorage.loggedInUser);
            return self.user;
        },
        setUser: function(username, token){
            self.user.username = username;
            self.user.token = token;
            sessionStorage.loggedInUser = angular.toJson(self.user);
        }
    }
}