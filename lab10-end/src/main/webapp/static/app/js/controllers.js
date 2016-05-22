var wafepaApp = angular.module('wafepaApp.controllers', []);

wafepaApp.controller('ActivityController', function($scope, $location, $routeParams, activityService) {
	
	$scope.getActivities = function() {
		$scope.hideSpinner = false;
		// HTTP GET api/activities
		activityService.getActivities({'name': $scope.search, 'page': $scope.page})
				.success(function(data, status, headers) {
					$scope.activities = data;
					$scope.hideSpinner = true;
					$scope.totalPages = headers('total-pages');
				})
				.error(function() {
					$scope.error = true;
					$scope.hideSpinner = true;
				});
	};
	
	$scope.deleteActivity = function(id) {
		activityService.deleteActivity(id)
				.success(function() {
					$scope.getActivities();
				})
				.error(function() {
					
				});
	};
	
	$scope.initActivity = function() {
		$scope.activity = {};
		
		if ($routeParams.id) { // edit stranica
			activityService.getActivity($routeParams.id)
					.success(function(data) {
						$scope.activity = data;
					})
					.error(function() {
						
					});
		}
	};
	
	$scope.saveActivity = function() {
		activityService.saveActivity($scope.activity)
				.success(function() {
					$location.path('/activities');
				})
				.error(function() {
					
				});
	};
});