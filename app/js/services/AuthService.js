module.exports = function ($localStorage) {

    var self = this;

    self.user = {
        username: '',
        token: ''
    };

    return {

        getUser: function(){
            self.user.username = window.localStorage.getItem("username");
            self.user.token = window.localStorage.getItem("token");
            console.log(self.user);
            return self.user;
        },
        setUser: function(username, token){
            console.log("setuser: " + username + " " + token);
            self.user = new Array();
            self.user.username = username;
            self.user.token = token;

            window.localStorage.setItem("username", username);
            window.localStorage.setItem("token", token);
        }
    }
}