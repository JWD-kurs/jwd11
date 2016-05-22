var wafepaApp = angular.module('wafepaApp.services', []);

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