/**
 * Main page Controller
 */
angular.module('homeController', []).controller('homeController', ['$scope', '$location', 'cityService', function($scope, $location, cityService) {

	$scope.city = cityService.city;

	// this checks for the input and makes it = to $scope.city
	$scope.$watch('city', function() {
		cityService.city = $scope.city;
	});

	// Will submit form when user presses enter
	$scope.submit = function() {
		$location.path("/forecast");

		
	};

}]);