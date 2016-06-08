require('angular/angular');
require('angular-ui-router');
require('ng-storage/ngStorage.min');
require('jquery/dist/jquery.min');


//instantiate app
var app = angular.module('Mahjong', ['ui.router', 'ngStorage']);

// Services
require('./config/service.js')(app);

// filters
require('./config/filters.js')(app);

// directives
require('./config/directives.js')(app);

// controllers
require('./config/controller.js')(app);

// Routing
require('./config/router.js')(app)

// Config
require('./config/config.js')(app);

// Constants
require('./constant/constant.js')(app);
