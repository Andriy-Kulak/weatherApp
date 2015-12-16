/**
 * Module...
 * @type {module}
 */
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

/**
 * Routes
 */
weatherApp.config(function ($routeProvider) {

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

		//used when user picks 2/5/7 days weater option in the app
		.when('/forecast/:days', {
			templateUrl: 'pages/forecast.html',
			controller: 'forecastController'
		})

});

/**
 * Service
 */
weatherApp.service('cityService', function() {

	this.city = "New York, NY";

});

/**
 * Main page Controller
 */
weatherApp.controller('homeController', ['$scope', '$location', 'cityService', function($scope, $location, cityService) {

	$scope.city = cityService.city;

	// this checks for the input and makes it = to $scope.city
	$scope.$watch('city', function() {
		cityService.city = $scope.city;
	});

	// Will submit form when user presses enter
	$scope.submit = function() {
		$location.path("/forecast");

		//test
		
	};

}]);

/**
 * Forecast Controller
 * $routeParams - allows you to retrieve the current set of route parameters.
 * $resource - factory which creates a resource object that lets you interact with RESTful server-side data sources.
 */
weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService',
	function($scope, $resource, $routeParams, cityService) {

	//takes input inputted on the main page
	$scope.city = cityService.city;

	//By default user gets a forecast of next two days
	$scope.days = $routeParams.days || '2';

	//API Get request for forecast
	$scope.weatherAPI =
		$resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=072df5ee8e2deb7041c6b02409370a64",
			{ callback: "JSON_CALLBACK" },
			{ get: { method: "JSONP" }});

	$scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });

	//converts API Kelvin to Fahrenheit
	$scope.convertToFahrenheit = function(degK) {
		return Math.round((1.8 * (degK - 273)) + 32);
	};

	//converts API date data to human readable day
	$scope.convertToDate = function(dt) {
		return new Date(dt * 1000);
	};

		//test
		$scope.getDescrip = function(x) {
			var d = 'description';

			return x[d];
		}

}]);