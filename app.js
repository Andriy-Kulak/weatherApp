/**
 * Module...
 * @type {module}
 */
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

/**
 * Route
 */
weatherApp.config(function ($routeProvider) {

	$routeProvider

		.when('/', {
			templateUrl: 'pages/main.html',
			controller: 'homeController'
		})

		.when('/forecast', {
			templateUrl: 'pages/forecast.html',
			controller: 'forecastController'
		})

		.when('/forecast/:days', {
			templateUrl: 'pages/forecast.html',
			controller: 'forecastController'
		})

});

// SERVICES
weatherApp.service('cityService', function() {

	this.city = "New York, NY";

});

/**
 * Main page Controller
 */
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {

	$scope.city = cityService.city;

	// this checks for the input and makes it = to $scope.city
	$scope.$watch('city', function() {
		cityService.city = $scope.city;
	});

}]);

/**
 * Forecast Controller
 * $routeParams - allows you to retrieve the current set of route parameters.
 * $resource - factory which creates a resource object that lets you interact with RESTful server-side data sources.
 */
weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService) {

	$scope.city = cityService.city;

	$scope.days = $routeParams.days || '2';

	$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=072df5ee8e2deb7041c6b02409370a64", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});

	$scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });


	$scope.convertToFahrenheit = function(degK) {
		return Math.round((1.8 * (degK - 273)) + 32);
	};

	$scope.convertToDate = function(dt) {
		return new Date(dt * 1000);
	};

}]);