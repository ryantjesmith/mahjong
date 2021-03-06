
module.exports = function(GameService, $scope, AuthService, $location, $timeout) {

	var self = $scope;
	//properties
	self.games = [];
	self.myGames = [];
	self.gameTemplates = [];
	self.newGame = [];
	self.allGames = [];

	//gets current user
	self.currentUser = AuthService.getUser();

	//html
	//ng-init="init({{mydata}})"


	/**
    * Get all gametemplates
    **/
	self.getGameTemplates = function(){
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
	}

    /**
    * Get all games
    **/
    self.getAllGames = function(){
    	GameService.getAllGames({
	      onSuccess: function (result) {
			self.allGames = result.data;
			console.log(result.data);
	        angular.forEach(result.data, function (value, key) {
	          	for(var i = 0; i < result.data[key].players.length; i++){
          			self.games[key] = value;
	          	}
	        })

	        //animate when successfully loaded
	        angular.element( document.querySelector( '.personalGames_container' ) ).addClass('animate_toFront');
	        angular.element( document.querySelector( '.personalGames_container.backside' ) ).addClass('animate_toBack');
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

  	          	//animate when successfully loaded
		        angular.element( document.querySelector( '.dashboard' ) ).addClass('animate_toFront');
		        angular.element( document.querySelector( '.dashboard.backside' ) ).addClass('animate_toBack');
  	        })
	      },
	      onError: function (err) {
	      	popupMessage("Something went wrong with getting the games");
	        console.log(err);
	      }
	    })
    }

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
	        self.toggleNewGame();
	        self.getAllGames();
	        self.getAllGamesByPlayer();
	      },
	      onError: function (err) {
	      	popupMessage("Woops! we failed to create you game");
	        console.log(err);
	      }
	    })
	}

	self.toggleSpectate = function(){
		$('.spectate_container').toggleClass('openTab');
	}
	self.toggleTheme = function(){
		$('.theme_container').toggleClass('openTab');
	}

	self.filterSpectate = function(){
		self.allGames = [];
		GameService.getAllGamesWithFilter(self.selectedFilter, {
	      onSuccess: function (result) {
			  console.log(result.data);
			  self.allGames = result.data;
	      },
	      onError: function (err) {
	      	popupMessage("Something went wrong with getting the games");
	        console.log(err);
	      }
	    })
	}

	self.changeTheme = function(theme){
		angular.element( document.querySelector( '.background' ) ).removeClass('theme1');
		angular.element( document.querySelector( '.background' ) ).removeClass('theme2');
		angular.element( document.querySelector( '.background' ) ).addClass(theme);
	}

	function popupMessage(message){
        self.message = message;
        $(".popup_message").addClass("flash_popup");
        $timeout(function(){
            $(".popup_message").removeClass("flash_popup");
        }, 3000);
    }

    self.init = function(){
    	self.getGameTemplates();
		self.getAllGames();
		self.getAllGamesByPlayer();
	}

};
