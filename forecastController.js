/**
 * Forecast Controller
 * $routeParams - allows you to retrieve the current set of route parameters. In this case,
 * it will be evaluating 'days' within the 3rd Route.
 * $resource - factory which creates a resource object that lets you interact with RESTful server-side data sources.
 */
angular.module('forecastController', ['ngResource']).controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService',
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