
module.exports = function(GameService, $scope, AuthService, $stateParams, $state, $timeout, MatchService) {

	var self = $scope;
	var tileModel;
	var socket;

	//properties
	self.game = [];
	self.currentUser = AuthService.getUser();
	self.timer = 11;
	self.showTimer = false;

	//tiles
	self.tiles = [];
	self.matchedTiles = [];

	self.getCurrentGame = function(){
		GameService.getCurrentGame($stateParams.gameId, {
			onSuccess: function(result){
				self.game = result.data;
				MatchService.currentGame = self.game;


			 	socket = io('http://mahjongmayhem.herokuapp.com?gameId=' + self.game._id);

				// Socket events
				socket.on('playerJoined', function (data) {
					$scope.$apply();

					var newPlayer = { _id: data._id, name: data.name };
					self.game.players.push(newPlayer);
			  	});

				socket.on('start', function (data) {
					popupMessage("Starting Game");

					self.showTimer = true;

					for(x=0; x<11; x++) window.setTimeout(function(){ self.timer--; $scope.$apply(); }, 1000 * x);

					setTimeout(function(){
						self.game.state = "playing";
						self.loadGame(self.game);
					}, 11000);
			  	});

				socket.on('end', function (data) {
					popupMessage("Game Ended");
			  	});



				if(self.game.state == "playing")
					self.loadGame(self.game);
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


	//gets all tiles
	self.getGameTiles = function(id) {

		GameService.getMatchedTiles(id, false, {
		  onSuccess: function(result) {
		  	console.log(result);
			self.tiles = result.data;

			popupMessage("Game Loaded");
		  },
		  onError: function(err) {
			console.log(err);
		  }
	  	});

	  	GameService.getMatchedTiles(id, true, {
		  onSuccess: function(result) {
		  	console.log(result);
			self.matchedTiles = result.data;
		  },
		  onError: function(err) {
			console.log(err);
		  }
	  	});
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
