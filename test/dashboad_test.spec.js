describe("DashboardCtrl", function() {
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
		// gameService.sayHello = sinon.stub();
		// gameService.sayHello.withArgs('Martijn').returns('Stub says hi Martijn');
		// gameService.sayHello.returns('Hi from stub');
		
		// This is the controller we're going to test
		dashboardCtrl = $controller('DashboardCtrl', { $scope: scope });
	}));

	it('should mock the httpbackend', function(){
		// Given
		var game = gameService.getGameTemplates[0];
		var expectedCode = 'Shanghai';
		var expectedError = 'Template not found';

		// Nu expecten we het omdat we in de test zitten.
		// Bij de before of beforeEach kunnen we ook whenPost stubben
		httpBackend
			.expectPOST('http://mahjongmayhem.herokuapp.com/GameTemplates', { code: expectedCode })
			.respond(404, { err: expectedError });

		// When
		dashboardCtrl.getGameTemplates(game, expectedCode);
		httpBackend.flush(); // Voer synchroon uit ipv asynchroon

		// Then
		expect(scope.error).to.equal(expectedError);
		//expect(person.courses).to.have.length(0);
	});
});