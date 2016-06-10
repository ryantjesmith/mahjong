
module.exports = function(GameService, $scope, AuthService, $stateParams, $state, $timeout, MatchService) {

	var self = $scope;
	var tileModel;
	//properties
	self.game = [];
	self.currentUser = AuthService.getUser();
	self.matchingTiles = [];

	self.getCurrentGame = function(){
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
	}

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

	//MATCHES TILES
	self.matchTiles = function(tile){

		if(self.matchingTiles.length == 0){
			self.matchingTiles.tile1Id = tile._id;
			console.log(self.matchingTiles);
		}
		else{
			self.matchingTiles.tile2Id = tile._id;

			console.log(self.matchingTiles);
		 	GameService.checkMatchedTiles(self.game._id, self.matchingTiles, {
			  onSuccess: function(result) {
				console.log(result);
				popupMessage(result);
				self.matchingTiles = [];
			  },
			  onError: function(err) {
				console.log(err);
			  }
		  	});
		}
	}

	self.showMatchedTiles = function(){
		$('.matchedTiles_container').toggleClass('openTab');
	}


	function popupMessage(message){
        $scope.message = message;
        $(".popup_message").addClass("flash_popup");
        $timeout(function(){
            $(".popup_message").removeClass("flash_popup");
        }, 3000);
    }


    self.init = function(){
    	self.getCurrentGame();
	}

	self.init();

};
