module.exports = function ($localStorage) {

    var self = this;

    self.user = {
        username: '',
        token: ''
    };

    return {

        getUser: function(){
            self.user.username = $localStorage.username;
            self.user.token = $localStorage.token;
            return self.user;
        },
        setUser: function(username, token){
            console.log("setuser: " + username + " " + token);
            self.user = new Array();
            self.user.username = username;
            self.user.token = token;

            $localStorage.username = username;
            $localStorage.token = token;

        }
    }
}