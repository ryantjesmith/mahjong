
module.exports = function(GameService, $scope, AuthService, $location, $state, $timeout) {

	var self = $scope;
	//properties
	self.games = [];
	self.myGames = [];
	self.gameTemplates = [];
	$scope.newGame = [];

	//gets current user
	$scope.currentUser = AuthService.getUser();

	$scope.newGameWindow_hidden = true;

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

	          if(result.data[key].createdBy._id == self.currentUser.username){
	          	self.myGames[key] = value;
	          }
	          else{
	          	for(var i = 0; i < result.data[key].players.length; i++){
	          		if(result.data[key].players[i]._id == self.currentUser.username){
	          			self.myGames[key] = value;
	          		}
	          		else{
	          			self.games[key] = value;
	          		}
	          	}
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
	      },
	      onError: function (err) {
	        console.log(err);
	        popupMessage("Something went wrong with joining the game");
	      }
	    })
	}
	

	  


	
	self.openNewGame = function(){
		$scope.newGameWindow_hidden = false;
		//self.game = { title: "Title", players: [self.user] };
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

		console.log(newGame);

		//POST TO API
		GameService.createGame(JSON.stringify(newGame), {
	      onSuccess: function (result) {
	      	popupMessage("Your game has been created!");
	        console.log(result);
	        $scope.newGameWindow_hidden = true;
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