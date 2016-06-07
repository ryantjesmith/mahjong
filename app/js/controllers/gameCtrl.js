
module.exports = function(GameService, $scope, AuthService, $stateParams, $state, $timeout) {

	var self = $scope;
	//properties
	self.game = [];
	self.currentUser = AuthService.getUser();

	GameService.getCurrentGame($stateParams.gameId, {
		onSuccess: function(result){
			self.game = result.data;

			if(self.game.state == "playing")
				self.loadGame(self.game);

			console.log(self.game);
		},
		onError: function(err){
			console.log(err);

		}
	})

	self.startGame = function(game){
		if(game.players.length < game.minPlayers){
			popupMessage("You need more people to start the game!");
			return;
		}
		else if(game.state != "open"){
			popupMessage("This game is already started!");
			return;
		}

		GameService.startGame(game._id, {
	      onSuccess: function(result) {
	      	popupMessage("Game started!");
	        console.log(result);
	      },
	      onError: function(err) {
	      	popupMessage("Woops! Something went wrong");
	        console.log(err);
	      }
	    })
	}

	self.loadGame = function(game){
		self.getGameTiles(game._id);
	}

	self.removeGame = function(game){
		GameService.removeGame(game._id, {
	      onSuccess: function(result) {
	      	$state.go('dashboard');
	        console.log(result);
	      },
	      onError: function(err) {
	      	popupMessage("Woops! Something went wrong");
	        console.log(err);
	      }
	    })
	}

	self.getGameTiles = function(id) {

		GameService.getGameTiles(id, {
		  onSuccess: function(result) {
			self.tiles = result.data;
		  },
		  onError: function(err) {
			console.log(err);
		  }
	  });
	}


	function popupMessage(message){
        $scope.message = message;
        $(".popup_message").addClass("flash_popup");
        $timeout(function(){
            $(".popup_message").removeClass("flash_popup");
        }, 3000);
    }

};
