
module.exports = function(GameFactory, $scope, AuthService, $location, $state) {
	var self = $scope;
	//properties
	self.games = new Array();

	$scope.newGameWindow_hidden = true;

	/*
	*
	*	Authentication
	*
	*/
	function getCurrentUser(){
        self.currentUser = AuthService.getUser();

        if(self.currentUser.username === null)
        	checkParams();
    }

    function checkParams(){
        var params = $location.search();
        if(params.username !== undefined){
        	if(params.username != "" && params.token != ""){
	            AuthService.setUser(params.username, params.token);
	            getCurrentUser();
	        }
        }
        else{
        	$state.go("login");
        }
    }
    /*
	*
	*	end authentication
	*
	*/

	constructor();

	function constructor(){

		getCurrentUser();

		GameFactory.GET(function(games){
			self.games = games;
		});
	}


	
	self.openNewGame = function(){
		$scope.newGameWindow_hidden = false;
		//self.game = { title: "Title", players: [self.user] };
	};

	self.createNewGame = function(){
		$scope.newGameWindow_hidden = true;

		//POST TO API
		GameFactory.POST($scope.newGame);
	}

};