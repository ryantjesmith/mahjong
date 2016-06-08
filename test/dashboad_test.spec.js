describe("DashboardController", function() {
	var dashboardCtrl;
	var gameService;
	var createNewController;
	var httpBackend;
	var scope;
	
	// initialize the app
	beforeEach(module('Mahjong'));

	// Inject the modules and get them in global variables
	beforeEach(inject(function($rootScope, $controller, $httpBackend, $injector){
		// The scope for the controller
		scope = $rootScope.$new();
		// Get the service which will be injected
		gameService = $injector.get('GameService');
		// For mocking the backend
		httpBackend = $httpBackend;

		// Stubbing with sinon
		//gameService.getGameTemplates = sinon.stub();

		
		// This is the controller we're going to test
		dashboardCtrl = $controller('DashboardCtrl', { $scope: scope });
	}));

	it('check if game created', function(){

		var newGame = {
			templateName: 'Ox',
			minPlayers: 2,
			maxPlayers: 4
		}

		expect(scope.newGameWindow_hidden).to.equal(true);

		//expect(gameService.createGame.args[0]).to.notEqual(null);


		//assert.equal(true, scope.newGameWindow_hidden);

		console.log(scope.games);
		//Given
		var game = scope.games[0];
		var expectedCode = 'WEBS6';
		var expectedError = 'Person not found';
		// Nu expecten we het omdat we in de test zitten.
		// Bij de before of beforeEach kunnen we ook whenPost stubben
		console.log(httpBackend);
		// httpBackend
		// 	.expectPOST('http://api.myApp.com/persons/' + person.id + '/courses', { code: expectedCode })
		// 	.respond(404, { err: expectedError });

		// // When
		// personController.addCourse(person, expectedCode);
		// httpBackend.flush(); // Voer synchroon uit ipv asynchroon

		// // Then
		// expect(scope.error).to.equal(expectedError);
		// expect(person.courses).to.have.length(0);

	});
});