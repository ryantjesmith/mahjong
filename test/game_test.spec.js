describe("GameCtrl", function() {
	var gameCtrl;
	var gameService;
	var authService;
    var createNewController;
	var httpBackend;
	var scope;

    var tile = {
        xPos: 18,
        yPos: 10,
        zPos: 2,
        tile: {
          _id: 92,
          suit: "Character",
          name: "6",
          matchesWholeSuit: false,
          __v: 0,
          id: "92"
        },
        _id: "575ebb68b62cb21100dc763d"
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
		gameCtrl = $controller('GameCtrl', { $scope: scope });

	}));

    //TEST
	it('should fill the list of tiles', function(){

		httpBackend
			.expectGET('http://mahjongmayhem.herokuapp.com/Games/575ebb68b62cb21100dc75b7/tiles')
			.respond(200, [tile, tile, tile]);

		httpBackend
			.expectGET('../partials/login.html')
			.respond(200);

		scope.getGameTiles();

		httpBackend.flush();

		expect(scope.tiles).to.have.length(3);
	});

});
