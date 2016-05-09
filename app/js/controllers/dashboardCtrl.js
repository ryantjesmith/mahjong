
module.exports = function(GameFactory, $scope) {
	var self = $scope;
	var info = "http://localhost:8080/authcallback?username=r.smith@student.avans.nl&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.InIuc21pdGhAc3R1ZGVudC5hdmFucy5ubCI.T3_QMymHpDoatgcC-KfgQ7MJthv3VwkllI5uH0X31pg";

	//properties
	self.games = new Array();
	self.user = "Ryan";
	$scope.newGameWindow_visible = false;

	constructor();

	function constructor(){
		GameFactory.GET(function(games){
			self.games = games;
		});
	}
	
	self.openNewGame = function(){
		$scope.newGameWindow_visible = true;
		//self.game = { title: "Title", players: [self.user] };
	};
};