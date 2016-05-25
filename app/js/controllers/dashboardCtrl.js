
module.exports = function(GameFactory, $scope) {
	var self = $scope;
	
	//properties
	self.games = new Array();

	$scope.newGameWindow_hidden = true;

	constructor();

	function constructor(){
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