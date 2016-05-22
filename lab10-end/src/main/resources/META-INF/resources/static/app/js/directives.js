var wafepaApp = angular.module('wafepaApp.directives', []);

wafepaApp.directive('activitiesTable', function() {
    return {
        restrict: 'E',                          // moguće vrednosti: 'A' (attribute), 'E' (element), 'C' (class), 'M' (comment)
        templateUrl: '/static/app/html/partial/activitiesTable.html',    // putanja ka fajlu koji sadrži HTML (koristi se ovo ILI template, ne oba)
        controller: 'ActivityController'              // kontroler
    }
});