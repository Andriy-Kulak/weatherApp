/**
 * Routes (ngRoute)
 *
 */
angular.module('angularRoutes', ['ngRoute']).config(function ($routeProvider) {

	$routeProvider

		//used for main page when use first enters the app
		.when('/', {
			templateUrl: 'pages/main.html',
			controller: 'homeController'
		})

		//used when user searches for forecast of a particular city
		.when('/forecast', {
			templateUrl: 'pages/forecast.html',
			controller: 'forecastController'
		})

		//used when user picks 2/5/7 days weather option in the app
		.when('/forecast/:days', {
			templateUrl: 'pages/forecast.html',
			controller: 'forecastController'
		});

});