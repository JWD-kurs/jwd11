var wafepaApp = angular.module('wafepaApp', ['ngRoute']);

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

wafepaApp.directive('activitiesTable', function() {
    return {
        restrict: 'E',                          // moguće vrednosti: 'A' (attribute), 'E' (element), 'C' (class), 'M' (comment)
        templateUrl: '/static/app/html/partial/activitiesTable.html',    // putanja ka fajlu koji sadrži HTML (koristi se ovo ILI template, ne oba)
        controller: 'ActivityController'              // kontroler
    }
});

wafepaApp.service('activityService', function($http) {
	
	this.url = 'api/activities';
	
	this.deleteActivity = function(id) {
		return $http.delete(this.url + '/' + id);
	};
	
	this.getActivity = function(id) {
		return $http.get(this.url + '/' + id);
	}
	
	this.getActivities = function(requestParams) {
		return $http.get(this.url, { params: requestParams });
	};
	
	this.saveActivity = function(activity) {
		if (activity.id) {
			return $http.put(this.url + '/' + activity.id, activity);
		} else {
			return $http.post(this.url, activity);
		}
	};
});

wafepaApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : '/static/app/html/partial/home.html'
        })
        .when('/activities', {
            templateUrl : '/static/app/html/partial/activities.html',
            controller: 'ActivityController'
        })
        .when('/activities/add', {
            templateUrl : '/static/app/html/partial/addEditActivity.html',
            controller: 'ActivityController'
        })
        .when('/activities/edit/:id', {
            templateUrl : '/static/app/html/partial/addEditActivity.html',
            controller: 'ActivityController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);