describe("DashboardController", function() {
	var dashboardCtrl;
	var gameService;
	var authService;
	var createNewController;
	var httpBackend;
	var scope;

	var game = {
		_id: "5541fc5b1872631100678bb4",
		createdBy:
		{
		_id: "rsmith@avans.nl",
		name: "Ryan Smith",
		__v: 0,
		id: "rsmith@avans.nl"
		},
		createdOn: "2015-04-30T09:56:43.516Z",
		startedOn: "2015-04-30T09:57:43.516Z",
		endedOn: "2015-04-30T09:58:43.516Z",
		gameTemplate:
		{
		_id: "Dragon",
		__v: 0,
		id: "Dragon"
		},
		__v: 0,
		players:
		[
		{
		_id: "rsmith@avans.nl",
		name: "Ryan Smith",
		__v: 0,
		id: "rsmith@avans.nl"
		}
		],
		maxPlayers: 32,
		minPlayers: 2,
		state: "open",
		id: "5541fc5b1872631100678bb4"
	}

	// initialize the app
	beforeEach(module('Mahjong'));

	// Inject the modules and get them in global variables
	beforeEach(inject(function($rootScope, $controller, $httpBackend, $injector){

		// The scope for the controller
		scope = $rootScope.$new();

		// Get the service which will be injected
		// gameService = $injector.get('GameService');

		authService = $injector.get('AuthService');

		// gameService.sayHello = sinon.stub();
		// gameService.sayHello.withArgs('Ryan Lays').returns('Hi from Ryan Lays');

		// For mocking the backend
		httpBackend = $httpBackend;

		// Stubbing with sinon
		//gameService.getGameTemplates = sinon.stub();

		// This is the controller we're going to test
		dashboardCtrl = $controller('DashboardCtrl', { $scope: scope });

	}));


	//TEST
	it('should join current player to the game', function(){

		httpBackend
			.expectPOST('http://mahjongmayhem.herokuapp.com/Games/' + game._id + '/Players')
			.respond(200);

		httpBackend
			.expectGET('../partials/login.html')
			.respond(200);

		scope.joinGame(game);
	});


	//TEST
	it('should fill the list of games', function(){

		httpBackend
			.expectGET('http://mahjongmayhem.herokuapp.com/Games')
			.respond(200, [game, game, game]);

		httpBackend
			.expectGET('../partials/login.html')
			.respond(200);

		scope.getAllGames();

		httpBackend.flush();

		expect(scope.games).to.have.length(3);
		expect(scope.games[0].players[0].name).to.equal("Ryan Smith");
	});


	//TEST
	it('should create a new game', function(){

		var gameTemplate = scope.newGame.gameTemplate = "Ox";
		var minPlayers = scope.newGame.minPlayers = 2;
		var maxPlayers = scope.newGame.maxPlayers = 30;

		var newGame = {
			templateName: gameTemplate,
			minPlayers: minPlayers,
			maxPlayers: maxPlayers
		}

		var user = authService.getUser();

		httpBackend
			.expectPOST('http://mahjongmayhem.herokuapp.com/Games', JSON.stringify(newGame))
			.respond(200, [game]);

		httpBackend
			.expectGET('../partials/login.html')
			.respond(200);

		httpBackend
			.expectGET('http://mahjongmayhem.herokuapp.com/Games')
			.respond(200);

		httpBackend
			.expectGET('http://mahjongmayhem.herokuapp.com/Games?player=' + user.username)
			.respond(200);

		scope.createNewGame();

		httpBackend.flush();

		expect(scope.newGameWindow_hidden).to.equal(true);

	});

});
