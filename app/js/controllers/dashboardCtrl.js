
module.exports = function(GameService, $scope, AuthService, $location, $timeout) {

	var self = $scope;
	//properties
	self.games = [];
	self.myGames = [];
	self.gameTemplates = [];
	$scope.newGame = [];

	//gets current user
	$scope.currentUser = AuthService.getUser();

	//GETS ALL GAME TEMPLATES
	GameService.getGameTemplates({
	    onSuccess: function(result) {
	      angular.forEach(result.data, function(value, key) {
	        self.gameTemplates[key] = value.id;
	        $scope.newGame.gameTemplate = self.gameTemplates[0];
	      });
	    },
	    onError: function(err) {
	      popupMessage("Something went wrong with getting the templates");
	      console.log(err);
	    }
	})

    /**
    * Get all games
    **/
    self.getAllGames = function(){
    	GameService.getAllGames({
	      onSuccess: function (result) {
	        angular.forEach(result.data, function (value, key) {
	          	for(var i = 0; i < result.data[key].players.length; i++){
          			self.games[key] = value;
	          	}
	        })
	      },
	      onError: function (err) {
	      	popupMessage("Something went wrong with getting the games");
	        console.log(err);
	      }
	    })
    }

	/**
    * Get all games by player
    **/

    self.getAllGamesByPlayer = function(){
    	GameService.getAllGamesByPlayer(self.currentUser.username, {
	      onSuccess: function (result) {
			  self.myGames = result.data;
			  angular.forEach(result.data, function (value, key) {
  	          	for(var i = 0; i < result.data.length; i++){
					for(var a = 0; a < value.players.length; a++){
						value.players[a].name = value.players[a].name.split(" ")[0];
					}
					self.myGames[key] = value;
  	          	}
  	        })
	      },
	      onError: function (err) {
	      	popupMessage("Something went wrong with getting the games");
	        console.log(err);
	      }
	    })
    }

    //get all the games available
	$scope.getAllGames();
	$scope.getAllGamesByPlayer();

    self.joinGame = function (game) {

    	if(game.players.length >= game.maxPlayers){
    		popupMessage("This game is full!");
    		return;
    	}

	    GameService.joinGame(game._id, {
	      onSuccess: function (result) {
	      	console.log(result);
	        popupMessage("Game joined!");
	        self.getAllGames();
	        self.getAllGamesByPlayer();
	      },
	      onError: function (err) {
	        console.log(err);
	        popupMessage("Something went wrong with joining the game");
	      }
	    })
	}

	self.toggleNewGame = function(){
		console.log("hoi");
		$('.newGameWindow').toggleClass('showNewGame');
	};

	self.createNewGame = function(){

		if(isNaN($scope.newGame.maxPlayers) || isNaN($scope.newGame.minPlayers)){
			popupMessage("Please fill in a number!");
			return;
		}
		var maxPlayers = parseInt($scope.newGame.maxPlayers);
		var minPlayers = parseInt($scope.newGame.minPlayers);
		var newGame = {
			templateName: $scope.newGame.gameTemplate,
			minPlayers: minPlayers,
			maxPlayers: maxPlayers
		}

		//POST TO API
		GameService.createGame(JSON.stringify(newGame), {
	      onSuccess: function (result) {
	      	popupMessage("Your game has been created!");
	        console.log(result);
	        $scope.newGameWindow_hidden = true;
	        self.getAllGames();
	        self.getAllGamesByPlayer();
	      },
	      onError: function (err) {
	      	popupMessage("Woops! we failed to create you game");
	        console.log(err);
	      }
	    })
	}


	function popupMessage(message){
        $scope.message = message;
        $(".popup_message").addClass("flash_popup");
        $timeout(function(){
            $(".popup_message").removeClass("flash_popup");
        }, 3000);
    }

};
